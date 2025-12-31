import { useEffect, useRef } from 'react';
import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';

export function ChangeCardHandler() {
  const { actionState, dispatchGameAction, setSelectedAction, setInChangeCardPhase } = useAction();
  const { sendChangeCardAction } = useSendMessage();

  // Ref-Guards to make sure to only handle each step once
  const didHandleWaitRef = useRef(false);
  const didHandleDoneRef = useRef(false);

  useEffect(() => {
    if (!actionState || actionState.type !== 'changeCard') {
      didHandleWaitRef.current = false;
      didHandleDoneRef.current = false;
      return;
    }

    const step = actionState.step;

    if (step === 'waitForGameState' && !didHandleWaitRef.current) {
      didHandleWaitRef.current = true;
      sendChangeCardAction({
        progressCardId: actionState.cardId!,
      });
    }
    if (step !== 'waitForGameState') {
      didHandleWaitRef.current = false;
    }

    if (step === 'done' && !didHandleDoneRef.current) {
      didHandleDoneRef.current = true;
      didHandleWaitRef.current = false;
      setInChangeCardPhase(false);
      dispatchGameAction({ type: 'FINISH_ACTION' });
    }
    if (step !== 'done') {
      didHandleDoneRef.current = false;
    }
  }, [
    actionState,
    sendChangeCardAction,
    dispatchGameAction,
    setSelectedAction,
    setInChangeCardPhase,
  ]);

  return null;
}
