import { EarnMoneyActionState } from '../types/Actions';
import { Game } from '../types/Game';

export type EarnMoneyAction =
  | { type: 'EARN_MONEY_INIT' }
  | { type: 'EARN_MONEY_CONFIRM' }
  | { type: 'EARN_MONEY_SET_AMOUNT'; amount: number; newGameState: Game };

export function earnMoneyReducer(
  state: EarnMoneyActionState | null,
  action: EarnMoneyAction
): EarnMoneyActionState | null {
  if (!state) {
    if (action.type === 'EARN_MONEY_INIT') {
      return {
        type: 'earnMoney',
        step: 'confirm',
        amount: null,
        newGameState: null,
      };
    }
    if (action.type === 'EARN_MONEY_SET_AMOUNT') {
      return {
        type: 'earnMoney',
        step: 'animateDie',
        amount: action.amount,
        newGameState: action.newGameState,
      };
    }
    return null;
  }

  switch (action.type) {
    case 'EARN_MONEY_INIT':
      return {
        type: 'earnMoney',
        step: 'confirm',
        amount: null,
        newGameState: null,
      };
    case 'EARN_MONEY_CONFIRM':
      return {
        ...state,
        step: 'waitForGameState',
      };
    case 'EARN_MONEY_SET_AMOUNT':
      return {
        ...state,
        step: 'animateDie',
        amount: action.amount,
        newGameState: action.newGameState,
      };
    default:
      return state;
  }
}
