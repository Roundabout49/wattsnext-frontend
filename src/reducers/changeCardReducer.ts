import { ChangeCardActionState } from '../types/Actions';
import { Game } from '../types/Game';

export type ChangeCardAction =
  | { type: 'CHANGE_CARD_INIT' }
  | { type: 'CHANGE_CARD_SELECT_CARD'; cardId: string }
  | { type: 'CHANGE_CARD_CONFIRM' }
  | { type: 'CHANGE_CARD_RESULT'; discardedCardId: string; newGameState: Game };

export function changeCardReducer(
  state: ChangeCardActionState | null,
  action: ChangeCardAction
): ChangeCardActionState | null {
  if (!state) {
    if (action.type === 'CHANGE_CARD_INIT') {
      return {
        type: 'changeCard',
        step: 'selectCard',
        cardId: null,
        newGameState: null,
      };
    }
    if (action.type === 'CHANGE_CARD_RESULT') {
      return {
        type: 'changeCard',
        step: 'done',
        cardId: action.discardedCardId,
        newGameState: action.newGameState,
      };
    }
    return null;
  }

  switch (action.type) {
    case 'CHANGE_CARD_INIT':
      return {
        type: 'changeCard',
        step: 'selectCard',
        cardId: null,
        newGameState: null,
      };
    case 'CHANGE_CARD_SELECT_CARD':
      return {
        ...state,
        step: 'confirm',
        cardId: action.cardId,
      };
    case 'CHANGE_CARD_CONFIRM':
      return {
        ...state,
        step: 'waitForGameState',
      };
    case 'CHANGE_CARD_RESULT':
      return {
        ...state,
        step: 'done',
        cardId: action.discardedCardId,
        newGameState: action.newGameState,
      };
    default:
      return state;
  }
}
