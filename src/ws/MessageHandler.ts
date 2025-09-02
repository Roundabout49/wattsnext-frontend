import { Dispatch } from 'react';
import {
  ActionResponse,
  EarnMoneyActionInformation,
  PlayTechnologyCardActionIntentInformation,
  PlayTechnologyCardActionInformation,
  PlayClimateCardActionInformation,
} from './MessageTypes';
import { GameAction } from '../context/ActionContext';

// TODO: Handle all ResponseStatuses handlers

export function handleEarnMoneyResult(
  result: ActionResponse<EarnMoneyActionInformation>,
  dispatch: Dispatch<GameAction>
) {
  dispatch({
    type: 'EARN_MONEY_SET_AMOUNT',
    amount: result.information!.diceValue,
    newGameState: result.game,
  });
}

// TODO: Temporarily disabled recycling option
export function handlePlayTechnologyCardIntentResult(
  result: ActionResponse<PlayTechnologyCardActionIntentInformation>,
  dispatch: Dispatch<GameAction>
) {
  if (result.status === 'OK') {
    dispatch({
      type: 'PLAY_CARD_SET_CAN_RECOVER',
      canRecover: result.information!.canRecycle && false,
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
    cardId: result.information!.playedCard.id,
    position: result.information!.targetPosition,
    recover: result.information!.didRecycle,
    moneyChange:
      result.information!.payedMoneyForCard + (result.information!.payedMoneyForRecycling ?? 0),
    resourceChange:
      result.information!.payedResourcesForCard -
      (result.information!.gainedResourcesForRecycling ?? 0),
    newGameState: result.game,
  });
}

export function handlePlayClimateCardResult(
  result: ActionResponse<PlayClimateCardActionInformation>,
  dispatch: Dispatch<GameAction>
) {
  dispatch({
    type: 'PLAY_CARD_RESULT',
    cardId: result.information!.playedCard.id,
    position: result.game.board.climateActionCards.length - 1, // Always played at the end of the list
    recover: false,
    moneyChange: result.information!.playedCard.moneyCosts.modifiedValue!,
    resourceChange: result.information!.playedCard.resourceCosts.modifiedValue!,
    newGameState: result.game,
  });
}
