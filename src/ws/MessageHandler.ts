import { Dispatch } from 'react';
import {
  ActionResponse,
  EarnMoneyActionInformation,
  PlayTechnologyCardActionIntentInformation,
  PlayTechnologyCardActionInformation,
  PlayClimateCardActionInformation,
  ResponseStatus,
} from './MessageTypes';
import { GameAction } from '../context/ActionContext';

// TODO: Handle all ResponseStatuses handlers

export function handleEarnMoneyResult(
  result: ActionResponse<EarnMoneyActionInformation>,
  dispatch: Dispatch<GameAction>
) {
  dispatch({
    type: 'EARN_MONEY_SET_AMOUNT',
    amount: result.actionInformation!.diceValue,
    newGameState: result.game,
  });
}

// TODO: Temporarily disabled recycling option
export function handlePlayTechnologyCardIntentResult(
  result: ActionResponse<PlayTechnologyCardActionIntentInformation>,
  dispatch: Dispatch<GameAction>
) {
  if (result.status === ResponseStatus.Ok) {
    dispatch({
      type: 'PLAY_CARD_SET_CAN_RECOVER',
      canRecover: result.actionInformation!.canRecycle && false,
    });
  } else {
    dispatch({ type: 'RESET' });
  }
}

export function handlePlayTechnologyCardResult(
  result: ActionResponse<PlayTechnologyCardActionInformation>,
  dispatch: Dispatch<GameAction>
) {
  dispatch({
    type: 'PLAY_CARD_RESULT',
    cardId: result.actionInformation!.playedCard.id,
    cardType: 'technology',
    position: result.actionInformation!.targetPosition,
    recover: result.actionInformation!.didRecycle,
    moneyChange:
      result.actionInformation!.payedMoneyForCard +
      (result.actionInformation!.payedMoneyForRecycling ?? 0),
    resourceChange:
      result.actionInformation!.payedResourcesForCard -
      (result.actionInformation!.gainedResourcesForRecycling ?? 0),
    newGameState: result.game,
  });
}

export function handlePlayClimateCardResult(
  result: ActionResponse<PlayClimateCardActionInformation>,
  dispatch: Dispatch<GameAction>
) {
  dispatch({
    type: 'PLAY_CARD_RESULT',
    cardId: result.actionInformation!.playedCard.id,
    cardType: 'climateAction',
    position: result.game.board.climateActionCards.length - 1, // Always played at the end of the list
    recover: false,
    moneyChange: result.actionInformation!.playedCard.moneyCosts.modifiedValue!,
    resourceChange: result.actionInformation!.playedCard.resourceCosts.modifiedValue!,
    newGameState: result.game,
  });
}
