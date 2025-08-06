import { useEffect, useRef } from 'react';
import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { usePlayer } from '../context/PlayerContext';

export function PlayCardHandler() {
  const { actionState, dispatchGameAction, setSelectedAction } = useAction();
  const { sendPlayCardIntent, sendPlayCard } = useSendMessage();
  const { playerId } = usePlayer();

  // Ref-Guards to make sure to only handle each step once
  const didHandleWaitIntentRef = useRef(false);
  const didHandleWaitDoneRef = useRef(false);
  const didHandleAnimateCardRef = useRef(false);

  useEffect(() => {
    if (!actionState || actionState.type !== 'playCard') return;
    const step = actionState.step;

    if (step === 'waitIfRecoverPossible' && !didHandleWaitIntentRef.current) {
      didHandleWaitIntentRef.current = true;
      sendPlayCardIntent({
        playerId: playerId!,
        cardId: actionState.cardId!,
        position: actionState.selectedPosition!,
      });
    }
    if (step !== 'waitIfRecoverPossible') {
      didHandleWaitIntentRef.current = false;
    }

    if (actionState.step === 'waitForGameState' && !didHandleWaitDoneRef.current) {
      didHandleWaitDoneRef.current = true;
      sendPlayCard({
        playerId: playerId!,
        cardId: actionState.cardId!,
        position: actionState.selectedPosition!,
        recover: actionState.recoverResources!,
      });
    }
    if (step !== 'waitForGameState') {
      didHandleWaitDoneRef.current = false;
    }

    if (step === 'animatePlayCard' && !didHandleAnimateCardRef.current) {
      didHandleAnimateCardRef.current = true;
      // TODO: Animate
      dispatchGameAction({ type: 'FINISH_ACTION' });
    }
    if (step !== 'animatePlayCard') {
      didHandleAnimateCardRef.current = false;
    }
  }, [
    actionState,
    sendPlayCardIntent,
    sendPlayCard,
    dispatchGameAction,
    playerId,
    setSelectedAction,
  ]);

  return null;
}
