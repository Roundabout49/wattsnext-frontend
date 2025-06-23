import { createContext, ReactNode, useContext, useReducer, useState } from 'react';
import {
  ActionKind,
  ActionState,
  EarnMoneyActionState,
  PlayCardActionState,
} from '../types/Actions';
import { PlayCardAction, playCardReducer } from '../reducers/playCardReducer';
import { EarnMoneyAction, earnMoneyReducer } from '../reducers/earnMoneyReducer';

type GameAction = PlayCardAction | EarnMoneyAction | { type: 'RESET' } /* ... */;

type ActionDispatch = (action: GameAction) => void;

interface ActionContextType {
  selectedAction: ActionKind;
  setSelectedAction: (action: ActionKind) => void;
  actionState: ActionState | null;
  dispatchGameAction: ActionDispatch;
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const ActionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAction, _setSelectedAction] = useState<ActionKind>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fallbackReducer = (state: ActionState | null, _action: GameAction): ActionState | null =>
    state;

  const combinedReducer = (state: ActionState | null, action: GameAction): ActionState | null => {
    if (action.type === 'RESET') {
      // TODO: Send reset to backend
      return null;
    }

    if (!state) {
      switch (action.type) {
        case 'PLAY_CARD_INIT':
          return playCardReducer(null, action);
        case 'EARN_MONEY_INIT':
          return earnMoneyReducer(null, action);
        // TODO: Add other action initial states
        default:
          return null;
      }
    }

    switch (state.type) {
      // TODO: Is there a way to avoid the type castings?
      case 'playCard':
        return playCardReducer(state as PlayCardActionState, action as PlayCardAction);
      case 'earnMoney':
        return earnMoneyReducer(state as EarnMoneyActionState, action as EarnMoneyAction);
      /*case 'discardCards':
        // return discardCardsReducer(state as DiscardCardsActionState, action);
        return state;
      case 'searchDeck':
        // return searchDeckReducer(state as SearchDeckActionState, action);
        return state;*/
      default:
        return fallbackReducer(state, action);
    }
  };

  const [actionState, dispatchGameAction] = useReducer(combinedReducer, null);

  const setSelectedAction = (action: ActionKind) => {
    _setSelectedAction(action);

    switch (action) {
      case 'playCard':
        dispatchGameAction({
          type: 'PLAY_CARD_INIT',
        } as PlayCardAction);
        break;
      case 'earnMoney':
        dispatchGameAction({ type: 'EARN_MONEY_INIT' } as EarnMoneyAction);
        break;
      /*case 'discardCards':
        // dispatch({ type: 'INIT_DISCARD_CARDS' } as DiscardCardsAction);
        break;
      case 'searchDeck':
        // dispatch({ type: 'INIT_SEARCH_DECK' } as SearchDeckAction);
        break;*/
      case null:
      default:
        dispatchGameAction({ type: 'RESET' } as GameAction);
        break;
    }
  };

  return (
    <ActionContext.Provider
      value={{
        selectedAction,
        setSelectedAction,
        actionState,
        dispatchGameAction: dispatchGameAction,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useAction = (): ActionContextType => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error('useAction must be used within an ActionProvider');
  }
  return context;
};
