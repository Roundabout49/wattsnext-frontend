import { Dispatch } from 'react';
import { EarnMoneyResult } from './MessageTypes';
import { EarnMoneyAction } from '../reducers/earnMoneyReducer';

export function handleEarnMoneyResult(
  result: EarnMoneyResult,
  dispatch: Dispatch<EarnMoneyAction>
) {
  dispatch({ type: 'EARN_MONEY_SET_AMOUNT', amount: result.amount, newGameState: result.newState });
}
