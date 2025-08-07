import { Dispatch } from 'react';
import { EarnMoneyResult, PlayCardIntentResult, PlayCardResult } from './MessageTypes';
import { GameAction } from '../context/ActionContext';

export function handleEarnMoneyResult(result: EarnMoneyResult, dispatch: Dispatch<GameAction>) {
  dispatch({ type: 'EARN_MONEY_SET_AMOUNT', amount: result.amount, newGameState: result.newState });
}

export function handlePlayCardIntentResult(
  result: PlayCardIntentResult,
  dispatch: Dispatch<GameAction>
) {
  if (result.playPossible) {
    dispatch({
      type: 'PLAY_CARD_SET_CAN_RECOVER',
      canRecover: result.recoverPossible,
    });
  } else {
    dispatch({ type: 'RESET' });
  }
}

export function handlePlayCardResult(result: PlayCardResult, dispatch: Dispatch<GameAction>) {
  dispatch({
    type: 'PLAY_CARD_RESULT',
    cardId: result.cardId,
    position: result.position,
    recover: result.recover,
    moneyChange: result.money,
    resourceChange: result.resources,
    newGameState: result.newState,
  });
}
