import { useEffect } from 'react';
import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';

export function EarnMoneyHandler() {
  const { actionState } = useAction();
  const { sendEarnMoney } = useSendMessage();

  useEffect(() => {
    if (actionState === null || actionState.type !== 'earnMoney') return;

    if (actionState.step === 'waitForGameState') {
      sendEarnMoney();
    }
  }, [actionState, sendEarnMoney]);

  return null;
}
