import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { useActionStep } from '../hooks/useActionStep';

export function ChangeCardHandler() {
  const { actionState, dispatchGameAction, setInChangeCardPhase } = useAction();
  const { sendChangeCardAction } = useSendMessage();

  useActionStep(actionState, 'changeCard', 'waitForGameState', (state) => {
    sendChangeCardAction({
      progressCardId: state.cardId!,
    });
  });

  useActionStep(actionState, 'changeCard', 'done', () => {
    setInChangeCardPhase(false);
    dispatchGameAction({ type: 'FINISH_ACTION' });
  });

  return null;
}
