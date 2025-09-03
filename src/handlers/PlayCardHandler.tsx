import { useEffect, useRef } from 'react';
import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { usePlayer } from '../context/PlayerContext';
import { useGame } from '../context/GameContext';
import { useCardAnimation } from '../context/CardAnimationContext';
import { cards } from '../data/cards';
import ProgressCardSmall from '../components/cards/ProgressCardSmall';

export function PlayCardHandler() {
  const { actionState, dispatchGameAction, setSelectedAction } = useAction();
  const { sendPlayTechnologyCardActionIntent, sendPlayTechnologyCardAction } = useSendMessage();
  const { playerId } = usePlayer();
  const { animateMoneyChange, animateResourcesChange, setGame: setGameState } = useGame();
  const { startCardAnimation } = useCardAnimation();

  // Ref-Guards to make sure to only handle each step once
  const didHandleWaitIntentRef = useRef(false);
  const didHandleWaitDoneRef = useRef(false);
  const didHandleAnimateCardRef = useRef(false);

  useEffect(() => {
    if (!actionState || actionState.type !== 'playCard') return;
    const step = actionState.step;

    if (step === 'waitIfRecoverPossible' && !didHandleWaitIntentRef.current) {
      didHandleWaitIntentRef.current = true;
      sendPlayTechnologyCardActionIntent({
        progressCardId: actionState.cardId!,
        targetPosition: actionState.selectedPosition!,
      });
    }
    if (step !== 'waitIfRecoverPossible') {
      didHandleWaitIntentRef.current = false;
    }

    if (actionState.step === 'waitForGameState' && !didHandleWaitDoneRef.current) {
      didHandleWaitDoneRef.current = true;
      sendPlayTechnologyCardAction({
        shallRecycle: actionState.recoverResources!,
      });
    }
    if (step !== 'waitForGameState') {
      didHandleWaitDoneRef.current = false;
    }

    if (step === 'animatePlayCard' && !didHandleAnimateCardRef.current) {
      didHandleAnimateCardRef.current = true;

      const fromRef = actionState.cardId!;
      const card = cards[actionState.cardId!];
      const area =
        card.type === 'climateAction' ? 'climate-action' : card.supply.technology.toLowerCase();
      const index = actionState.selectedPosition!;
      const toRef = `${area}-${index}`;

      animateResourcesChange(actionState.resourceChange ?? 0);
      animateMoneyChange(actionState.moneyChange ?? 0, () => {
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            players: prev.players.map((p) =>
              p.id === playerId
                ? { ...p, handCards: p.handCards.filter((c) => c.name !== actionState.cardId) }
                : p
            ),
          }));
          startCardAnimation(fromRef, toRef, <ProgressCardSmall card={card} />, () =>
            dispatchGameAction({ type: 'FINISH_ACTION' })
          );
        }, 1000);
      });
    }
    if (step !== 'animatePlayCard') {
      didHandleAnimateCardRef.current = false;
    }
  }, [
    actionState,
    sendPlayTechnologyCardActionIntent,
    sendPlayTechnologyCardAction,
    dispatchGameAction,
    playerId,
    setSelectedAction,
  ]);

  return null;
}
