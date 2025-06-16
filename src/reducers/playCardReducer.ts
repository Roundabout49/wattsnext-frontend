import { PlayCardActionState } from '../types/Actions';

// TODO: Add submit action?
export type PlayCardAction =
  | { type: 'INIT_STATE' }
  | { type: 'SELECT_CARD'; cardId: string }
  | { type: 'SELECT_POSITION'; selectedPosition: number }
  | { type: 'SET_CAN_RECOVER'; canRecover: boolean }
  | { type: 'SELECT_RECOVER_RESOURCES'; recover: boolean }
  | { type: 'RESET' };

export function playCardReducer(
  state: PlayCardActionState,
  action: PlayCardAction
): PlayCardActionState | null {
  switch (action.type) {
    case 'INIT_STATE':
      return {
        type: 'playCard',
        step: 'selectCard',
        cardId: null,
        selectedPosition: null,
        recoverResources: null,
      };
    case 'SELECT_CARD':
      return {
        ...state,
        cardId: action.cardId,
        selectedPosition: null,
        recoverResources: null,
        step: 'selectPosition',
      };
    case 'SELECT_POSITION':
      return {
        ...state,
        selectedPosition: action.selectedPosition,
        recoverResources: null,
        step: 'waitIfRecoverPossible',
      };
    case 'SET_CAN_RECOVER':
      return {
        ...state,
        recoverResources: action.canRecover ? null : false,
        step: action.canRecover ? 'selectRecoverResources' : 'confirm',
      };
    case 'SELECT_RECOVER_RESOURCES':
      return {
        ...state,
        recoverResources: action.recover,
        step: 'confirm',
      };
    case 'RESET':
      return null;
    default:
      return state;
  }
}
