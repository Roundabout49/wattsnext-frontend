import { useSendMessage } from '../context/SendMessageContext';
import { EarnMoneyActionState } from '../types/Actions';

export type EarnMoneyAction =
  | { type: 'EARN_MONEY_INIT' }
  | { type: 'EARN_MONEY_CONFIRM' }
  | { type: 'EARN_MONEY_SET_AMOUNT'; amount: number };

const { sendEarnMoney } = useSendMessage();

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
      };
    case 'EARN_MONEY_CONFIRM':
      sendEarnMoney();
      return {
        ...state,
        step: 'waitForGameState',
      };
    case 'EARN_MONEY_SET_AMOUNT':
      return {
        ...state,
        step: 'done',
        amount: action.amount,
      };
    default:
      return state;
  }
}
