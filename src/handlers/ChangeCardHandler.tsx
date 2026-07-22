import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { useActionStep } from '../hooks/useActionStep';
import { HAND_CARD_DISCARD_MS } from '../animationTimings';

export function ChangeCardHandler() {
  const { actionState, dispatchGameAction, setInChangeCardPhase } = useAction();
  const { sendChangeCardAction } = useSendMessage();

  useActionStep(actionState, 'changeCard', 'waitForGameState', (state) => {
    sendChangeCardAction({
      progressCardId: state.cardId!,
    });
  });

  useActionStep(actionState, 'changeCard', 'animateChangeCard', () => {
    // The discarded card fades out in the hand; then apply the server state,
    // which removes it and adds the drawn card (which fades in on mount).
    setTimeout(() => dispatchGameAction({ type: 'CLEANUP_ACTION' }), HAND_CARD_DISCARD_MS);
  });

  useActionStep(actionState, 'changeCard', 'done', () => {
    setInChangeCardPhase(false);
    dispatchGameAction({ type: 'FINISH_ACTION' });
  });

  return null;
}
