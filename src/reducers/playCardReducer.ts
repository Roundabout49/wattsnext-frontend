import { PlayCardActionState } from '../types/Actions';

// TODO: Add submit action?
export type PlayCardAction =
  | { type: 'PLAY_CARD_INIT_STATE' }
  | { type: 'SELECT_CARD'; cardId: string }
  | { type: 'SELECT_POSITION'; selectedPosition: number }
  | { type: 'SET_CAN_RECOVER'; canRecover: boolean }
  | { type: 'SELECT_RECOVER_RESOURCES'; recover: boolean }
  | { type: 'RESET' };

export function playCardReducer(
  state: PlayCardActionState | null,
  action: PlayCardAction
): PlayCardActionState | null {
  if (!state) {
    if (action.type === 'PLAY_CARD_INIT_STATE') {
      return {
        type: 'playCard',
        step: 'selectCard',
        cardId: null,
        selectedPosition: null,
        recoverResources: null,
      };
    }
    return null; // No valid state to handle the action
  }
  switch (action.type) {
    case 'PLAY_CARD_INIT_STATE':
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
