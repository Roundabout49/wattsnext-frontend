import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import {
  ActionKind,
  ActionState,
  ChangeCardActionState,
  EarnMoneyActionState,
  PlayCardActionState,
} from '../types/Actions';
import { PlayCardAction, playCardReducer } from '../reducers/playCardReducer';
import { EarnMoneyAction, earnMoneyReducer } from '../reducers/earnMoneyReducer';
import { useGame } from './GameContext';
import { ChangeCardAction, changeCardReducer } from '../reducers/changeCardReducer';

export type GameAction =
  | PlayCardAction
  | EarnMoneyAction
  | ChangeCardAction
  | { type: 'RESET' }
  // handlers can do any cleanup on done step and then dispatch FINISH_ACTION
  | { type: 'CLEANUP_ACTION' }
  // Reset action and state to null
  | { type: 'FINISH_ACTION' }
  // used internally to finally set action state to null
  | { type: 'CLEAR_ACTION' };

type ActionDispatch = (action: GameAction) => void;

interface ActionContextType {
  selectedAction: ActionKind;
  setSelectedAction: (action: ActionKind) => void;
  actionState: ActionState | null;
  dispatchGameAction: ActionDispatch;
  inChangeCardPhase: boolean;
  setInChangeCardPhase: (inChangeCardPhase: boolean) => void;
  setPendingPhaseCompleted: (phaseCompleted: boolean) => void;
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const ActionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAction, _setSelectedAction] = useState<ActionKind>(null);
  const [inChangeCardPhase, setInChangeCardPhase] = useState<boolean>(true);
  const [pendingPhaseCompleted, setPendingPhaseCompleted] = useState<boolean>(false);

  const { setGame: setGameState, setPhaseCompleted } = useGame();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fallbackReducer = (state: ActionState | null, _action: GameAction): ActionState | null =>
    state;

  const combinedReducer = (state: ActionState | null, action: GameAction): ActionState | null => {
    // TODO: Not always possible
    if (action.type === 'RESET') {
      // TODO: Send reset to backend
      return null;
    }

    if (action.type === 'CLEAR_ACTION') {
      return null;
    }

    if (action.type === 'CLEANUP_ACTION') {
      // set state to done before finishing to allow handlers to clean up
      if (state) {
        return {
          ...state,
          step: 'done',
        };
      }
      return null;
    }

    if (action.type === 'FINISH_ACTION') {
      return state
        ? {
            ...state,
            finishRequested: true,
          }
        : null;
    }

    // TODO: This is probably unnecessary here as the invalid cases are already handled in the individual reducers
    if (!state) {
      switch (action.type) {
        case 'PLAY_CARD_INIT':
          return playCardReducer(null, action);
        case 'EARN_MONEY_INIT':
          return earnMoneyReducer(null, action);
        case 'PLAY_CARD_RESULT':
          return playCardReducer(null, action);
        case 'EARN_MONEY_SET_AMOUNT':
          return earnMoneyReducer(null, action);
        case 'CHANGE_CARD_INIT':
          return changeCardReducer(null, action);
        case 'CHANGE_CARD_RESULT':
          return changeCardReducer(null, action);
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
      case 'changeCard':
        return changeCardReducer(state as ChangeCardActionState, action as ChangeCardAction);
      default:
        return fallbackReducer(state, action);
    }
  };

  const [actionState, dispatchGameAction] = useReducer(combinedReducer, null);

  useEffect(() => {
    if (!actionState?.finishRequested) return;

    if (actionState.newGameState) {
      setGameState(actionState.newGameState);
    }

    if (actionState.type !== 'changeCard') {
      setInChangeCardPhase(true);
    }

    if (pendingPhaseCompleted) {
      setPhaseCompleted(true);
      setPendingPhaseCompleted(false);
    }

    _setSelectedAction(null);
    dispatchGameAction({ type: 'CLEAR_ACTION' });
  }, [actionState, pendingPhaseCompleted, setPhaseCompleted, setGameState]);

  // If an action is aborted outside the normal finish flow (e.g. the backend
  // rejected it and the result handler dispatched RESET), clear the selection
  // as well so the ActionBar offers the action menu again.
  useEffect(() => {
    if (!actionState && selectedAction) {
      _setSelectedAction(null);
    }
  }, [actionState, selectedAction]);

  const setSelectedAction = (action: ActionKind) => {
    dispatchGameAction({ type: 'CLEAR_ACTION' });
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
      case 'changeCard':
        dispatchGameAction({ type: 'CHANGE_CARD_INIT' } as ChangeCardAction);
        break;
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
        dispatchGameAction,
        inChangeCardPhase,
        setInChangeCardPhase,
        setPendingPhaseCompleted,
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
