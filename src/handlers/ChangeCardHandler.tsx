import { useEffect, useRef } from 'react';
import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';

export function ChangeCardHandler() {
  const { actionState, dispatchGameAction, setSelectedAction, setInChangeCardPhase } = useAction();
  const { sendChangeCardAction } = useSendMessage();

  // Ref-Guards to make sure to only handle each step once
  const didHandleWaitRef = useRef(false);

  useEffect(() => {
    if (!actionState || actionState.type !== 'changeCard') return;

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

    if (step === 'done') {
      didHandleWaitRef.current = false;
      setInChangeCardPhase(false);
      dispatchGameAction({ type: 'FINISH_ACTION' });
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
