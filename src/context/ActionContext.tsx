import { createContext, ReactNode, useContext, useReducer, useState } from 'react';
import { ActionKind, ActionState, PlayCardActionState } from '../types/Actions';
import { PlayCardAction, playCardReducer } from '../reducers/playCardReducer';

type GameAction = PlayCardAction /* | EarnMoneyAction | ... */;

type ActionDispatch = (action: GameAction) => void;

interface ActionContextType {
  selectedAction: ActionKind;
  setSelectedAction: (action: ActionKind) => void;
  actionState: ActionState | null;
  dispatch: ActionDispatch;
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const ActionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAction, _setSelectedAction] = useState<ActionKind>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fallbackReducer = (state: ActionState | null, _action: GameAction): ActionState | null =>
    state;

  const combinedReducer = (state: ActionState | null, action: GameAction): ActionState | null => {
    if (!state) return state;

    switch (state.type) {
      case 'playCard':
        return playCardReducer(state as PlayCardActionState, action);
      case 'earnMoney':
        // return earnMoneyReducer(state as EarnMoneyActionState, action);
        return state; // Platzhalter
      case 'discardCards':
        // return discardCardsReducer(state as DiscardCardsActionState, action);
        return state;
      case 'searchDeck':
        // return searchDeckReducer(state as SearchDeckActionState, action);
        return state;
      default:
        return fallbackReducer(state, action);
    }
  };

  const [actionState, dispatch] = useReducer(combinedReducer, null);

  const setSelectedAction = (action: ActionKind) => {
    _setSelectedAction(action);

    switch (action) {
      case 'playCard':
        dispatch({
          type: 'INIT_STATE',
        } as PlayCardAction);
        break;
      case 'earnMoney':
        // dispatch({ type: 'INIT_EARN_MONEY' } as EarnMoneyAction);
        break;
      case 'discardCards':
        // dispatch({ type: 'INIT_DISCARD_CARDS' } as DiscardCardsAction);
        break;
      case 'searchDeck':
        // dispatch({ type: 'INIT_SEARCH_DECK' } as SearchDeckAction);
        break;
      case null:
      default:
        dispatch({ type: 'RESET' } as GameAction);
        break;
    }
  };

  return (
    <ActionContext.Provider
      value={{
        selectedAction,
        setSelectedAction,
        actionState,
        dispatch,
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
