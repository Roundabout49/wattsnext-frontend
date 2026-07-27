import { Dispatch } from 'react';
import {
  ActionResponse,
  EarnMoneyActionInformation,
  PlayTechnologyCardActionIntentInformation,
  PlayTechnologyCardActionInformation,
  PlayClimateCardActionInformation,
  ResponseStatus,
  ChangeCardActionInformation,
  AnswerQuizActionInformation,
  BaseInfo,
} from './MessageTypes';
import { GameAction } from '../context/ActionContext';
import { EventToShow } from '../context/EventAnimationContext';
import { QuizReveal } from '../context/QuizAnimationContext';
import { getCatastropheSlotDomId, getEventSlotDomId } from '../utils/cardDomId';
import { GAME_VARIANT } from '../gameConfig';
import { Game } from '../types/Game';

// Everything a result handler needs besides the result itself. Assembled once
// in WebSocketProvider and passed to every handler (plain parameter object,
// not a React context).
export interface ResultHandlerContext {
  dispatch: Dispatch<GameAction>;
  setPendingPhaseCompleted: (phaseCompleted: boolean) => void;
  setPendingEvent: (event: EventToShow) => void;
  setPendingPhaseEvents: (events: EventToShow[]) => void;
  setPendingActionMessage: (message: string) => void;
  showQuizReveal: (reveal: QuizReveal) => void;
  notify: (message: string) => void;
  playerId: string | null;
}

/**
 * Sentence subject for the player who just acted, e.g. "Du hast" for the local
 * player or "Anna hat" for others. Actions advance the turn (currentPlayer is
 * already the next one in the result), so the actor is the previous move — except
 * changing a card, which does not advance the turn.
 */
function actorPrefix(game: Game, advanced: boolean, playerId: string | null): string {
  const playerCount = game.players.length;
  if (playerCount === 0) return 'Ein Spieler hat';
  const totalMove = game.turnsPerPhase * game.phaseIndex + game.turnInPhase;
  const index = (((advanced ? totalMove - 1 : totalMove) % playerCount) + playerCount) % playerCount;
  const player = game.players[index];
  return player.id === playerId ? 'Du hast' : `${player.name} hat`;
}

// The Ok entry is used when the backend reports success but the expected
// actionInfo payload is missing.
const errorMessages: Record<ResponseStatus, string> = {
  [ResponseStatus.Ok]: 'Unerwartete Antwort vom Server.',
  [ResponseStatus.IllegalAction]: 'Diese Aktion ist gerade nicht erlaubt.',
  [ResponseStatus.IllegalActionArguments]: 'Die Aktion wurde mit ungültigen Angaben gesendet.',
};

/**
 * Common envelope handling for every action result: processes baseInfo and,
 * on an error status, aborts the action in progress instead of leaving it
 * stuck in a waiting step. Only on success is the action-specific `onOk` run.
 */
function handleActionResult<T>(
  result: ActionResponse<T>,
  handlerContext: ResultHandlerContext,
  onOk: (actionInfo: T) => void
) {
  if (result.baseInfo) {
    handleBaseInfo(result.baseInfo, handlerContext.setPendingPhaseCompleted);
  }

  if (result.status !== ResponseStatus.Ok || !result.actionInfo) {
    handlerContext.dispatch({ type: 'RESET' });
    // Results are broadcast to every client in the game; only the player
    // whose action failed should see the error message.
    if (handlerContext.playerId === result.game.currentPlayerId) {
      handlerContext.notify(errorMessages[result.status]);
    }
    return;
  }

  // Remember drawn event cards so they can be animated once the action ends.
  // A newly drawn standard event is always the last card in board.eventCards.
  const baseInfo = result.baseInfo;
  if (baseInfo?.gotNewStandardEventCard) {
    const board = result.game.board;
    const index = board.eventCards.length - 1;
    const standardCard = board.eventCards[index];

    if (baseInfo.phaseCompleted) {
      // Phase boundary: play after the evaluation table — the catastrophe (only
      // drawn when the targets were missed) first, then the new phase's event.
      const queue: EventToShow[] = [];
      if (board.catastropheCard) {
        queue.push({
          card: board.catastropheCard,
          effects: [],
          slotDomId: getCatastropheSlotDomId(),
        });
      }
      if (standardCard) {
        queue.push({ card: standardCard, effects: [], slotDomId: getEventSlotDomId(index) });
      }
      handlerContext.setPendingPhaseEvents(queue);
    } else if (standardCard) {
      // Mid-phase: play right after the action, with its effects.
      handlerContext.setPendingEvent({
        card: standardCard,
        effects: result.eventEffectInfo ?? [],
        slotDomId: getEventSlotDomId(index),
      });
    }
  }

  onOk(result.actionInfo);
}

export function handleEarnMoneyResult(
  result: ActionResponse<EarnMoneyActionInformation>,
  handlerContext: ResultHandlerContext
) {
  handleActionResult(result, handlerContext, (actionInfo) => {
    handlerContext.setPendingActionMessage(
      `${actorPrefix(result.game, true, handlerContext.playerId)} ${actionInfo.diceValue} Geld verdient.`
    );
    handlerContext.dispatch({
      type: 'EARN_MONEY_SET_AMOUNT',
      amount: actionInfo.diceValue,
      newGameState: result.game,
    });
  });
}

export function handlePlayTechnologyCardIntentResult(
  result: ActionResponse<PlayTechnologyCardActionIntentInformation>,
  handlerContext: ResultHandlerContext
) {
  handleActionResult(result, handlerContext, (actionInfo) => {
    handlerContext.dispatch({
      type: 'PLAY_CARD_SET_CAN_RECOVER',
      canRecover: actionInfo.canRecycle && GAME_VARIANT === 'advanced',
    });
  });
}

export function handlePlayTechnologyCardResult(
  result: ActionResponse<PlayTechnologyCardActionInformation>,
  handlerContext: ResultHandlerContext
) {
  handleActionResult(result, handlerContext, (actionInfo) => {
    handlerContext.setPendingActionMessage(
      `${actorPrefix(result.game, true, handlerContext.playerId)} „${actionInfo.playedCard.name}" gespielt.`
    );
    handlerContext.dispatch({
      type: 'PLAY_CARD_RESULT',
      cardId: actionInfo.playedCard.id,
      cardType: 'technology',
      position: actionInfo.targetPosition,
      recover: actionInfo.didRecycle,
      moneyChange: -1 * (actionInfo.payedMoneyForCard + (actionInfo.payedMoneyForRecycling ?? 0)),
      resourceChange:
        -1 * (actionInfo.payedResourcesForCard - (actionInfo.gainedResourcesForRecycling ?? 0)),
      newGameState: result.game,
    });
  });
}

export function handlePlayClimateCardResult(
  result: ActionResponse<PlayClimateCardActionInformation>,
  handlerContext: ResultHandlerContext
) {
  handleActionResult(result, handlerContext, (actionInfo) => {
    handlerContext.setPendingActionMessage(
      `${actorPrefix(result.game, true, handlerContext.playerId)} „${actionInfo.playedCard.name}" gespielt.`
    );
    handlerContext.dispatch({
      type: 'PLAY_CARD_RESULT',
      cardId: actionInfo.playedCard.id,
      cardType: 'climateAction',
      position: result.game.board.climateActionCards.length - 1, // Always played at the end of the list
      recover: false,
      moneyChange: -1 * actionInfo.playedCard.moneyCosts.modifiedValue!,
      resourceChange: -1 * actionInfo.playedCard.resourceCosts.modifiedValue!,
      newGameState: result.game,
    });
  });
}

export function handleChangeCardResult(
  result: ActionResponse<ChangeCardActionInformation>,
  handlerContext: ResultHandlerContext
) {
  handleActionResult(result, handlerContext, (actionInfo) => {
    handlerContext.setPendingActionMessage(
      `${actorPrefix(result.game, false, handlerContext.playerId)} eine Karte getauscht.`
    );
    handlerContext.dispatch({
      type: 'CHANGE_CARD_RESULT',
      discardedCardId: actionInfo.discardedCard.id,
      newGameState: result.game,
    });
  });
}

/**
 * The quiz answer is not routed through the action reducer: it drives the QuizOverlay directly.
 * On success the reveal (correct answer + explanation + money change) is shown; the new game state
 * rides along and is applied by the overlay once the reveal is dismissed. On an error only the
 * player who answered is notified.
 */
export function handleAnswerQuizResult(
  result: ActionResponse<AnswerQuizActionInformation>,
  handlerContext: ResultHandlerContext
) {
  if (result.status !== ResponseStatus.Ok || !result.actionInfo) {
    if (handlerContext.playerId === result.game.currentPlayerId) {
      handlerContext.notify(errorMessages[result.status]);
    }
    return;
  }

  handlerContext.showQuizReveal({ ...result.actionInfo, newGameState: result.game });
}

function handleBaseInfo(
  baseInfo: BaseInfo,
  setPendingPhaseCompleted: (phaseCompleted: boolean) => void
) {
  if (
    baseInfo.phaseCompleted !== undefined &&
    baseInfo.phaseCompleted !== null &&
    baseInfo.phaseCompleted
  ) {
    setPendingPhaseCompleted(true);
  }
}
