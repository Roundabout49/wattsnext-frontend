import { useEffect } from 'react';
import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';

export function PlayCardHandler() {
  const { actionState } = useAction();
  const { sendPlayCardIntent, sendPlayCard } = useSendMessage();

  useEffect(() => {
    if (actionState === null || actionState.type !== 'playCard') return;

    if (actionState.step === 'waitIfRecoverPossible') {
      sendPlayCardIntent({
        cardId: actionState.cardId!,
        position: actionState.selectedPosition!,
      });
    }

    if (actionState.step === 'waitForDone') {
      sendPlayCard({
        cardId: actionState.cardId!,
        position: actionState.selectedPosition!,
        recover: actionState.recoverResources!,
      });
    }
  }, [actionState, sendPlayCardIntent, sendPlayCard]);

  return null;
}
