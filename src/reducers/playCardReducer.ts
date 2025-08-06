import { PlayCardActionState } from '../types/Actions';
import { GameState } from '../types/GameState';

export type PlayCardAction =
  | { type: 'PLAY_CARD_INIT' }
  | { type: 'PLAY_CARD_SELECT_CARD'; cardId: string }
  | { type: 'PLAY_CARD_DESELECT_CARD' }
  | { type: 'PLAY_CARD_SELECT_POSITION'; selectedPosition: number }
  | { type: 'PLAY_CARD_SET_CAN_RECOVER'; canRecover: boolean }
  | { type: 'PLAY_CARD_SELECT_RECOVER_RESOURCES'; recover: boolean }
  | { type: 'PLAY_CARD_CONFIRM' }
  | {
      type: 'PLAY_CARD_RESULT';
      cardId: string;
      position: number;
      recover: boolean;
      newGameState: GameState;
    }
  | { type: 'PLAY_CARD_DONE' };

export function playCardReducer(
  state: PlayCardActionState | null,
  action: PlayCardAction
): PlayCardActionState | null {
  if (!state) {
    if (action.type === 'PLAY_CARD_INIT') {
      return {
        type: 'playCard',
        step: 'selectCard',
        cardId: null,
        selectedPosition: null,
        recoverResources: null,
        newGameState: null,
      };
    }
    return null; // No valid state to handle the action
  }
  switch (action.type) {
    case 'PLAY_CARD_INIT':
      return {
        type: 'playCard',
        step: 'selectCard',
        cardId: null,
        selectedPosition: null,
        recoverResources: null,
        newGameState: null,
      };
    case 'PLAY_CARD_SELECT_CARD':
      return {
        ...state,
        cardId: action.cardId,
        selectedPosition: null,
        recoverResources: null,
        step: 'selectPosition',
      };
    case 'PLAY_CARD_DESELECT_CARD':
      return {
        ...state,
        cardId: null,
        selectedPosition: null,
        recoverResources: null,
        step: 'selectCard',
      };
    case 'PLAY_CARD_SELECT_POSITION':
      return {
        ...state,
        selectedPosition: action.selectedPosition,
        recoverResources: null,
        step: 'waitIfRecoverPossible',
      };
    case 'PLAY_CARD_SET_CAN_RECOVER':
      return {
        ...state,
        recoverResources: action.canRecover ? null : false,
        step: action.canRecover ? 'selectRecoverResources' : 'confirm',
      };
    case 'PLAY_CARD_SELECT_RECOVER_RESOURCES':
      return {
        ...state,
        recoverResources: action.recover,
        step: 'confirm',
      };
    case 'PLAY_CARD_CONFIRM':
      return {
        ...state,
        step: 'waitForGameState',
      };
    case 'PLAY_CARD_RESULT':
      return {
        ...state,
        step: 'animatePlayCard',
        cardId: action.cardId,
        selectedPosition: action.position,
        recoverResources: action.recover,
        newGameState: action.newGameState,
      };
    case 'PLAY_CARD_DONE':
      return {
        ...state,
        step: 'done',
      };
    default:
      return state;
  }
}
