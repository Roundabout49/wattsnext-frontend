import { useEffect, useRef } from 'react';
import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { useGame } from '../context/GameContext';
import { useCardAnimation } from '../context/CardAnimationContext';
import ProgressCardSmall from '../components/cards/ProgressCardSmall';
import { Player } from '../types/Game';
import { ProgressCard } from '../types/ProgressCards';

export function PlayCardHandler() {
  const { actionState, dispatchGameAction, setSelectedAction } = useAction();
  const {
    sendPlayTechnologyCardActionIntent,
    sendPlayTechnologyCardAction,
    sendPlayClimateCardAction,
  } = useSendMessage();
  const { animateMoneyChange, animateResourcesChange, setGame: setGameState, game } = useGame();
  const { startCardAnimation } = useCardAnimation();

  const players: Player[] = game ? game.players : [];
  const currentPlayerId: string | null = game ? game.currentPlayerId : null;

  // Ref-Guards to make sure to only handle each step once
  const didHandleWaitIntentRef = useRef(false);
  const didHandleWaitDoneRef = useRef(false);
  const didHandleAnimateCardRef = useRef(false);

  useEffect(() => {
    if (!actionState || actionState.type !== 'playCard') return;
    const step = actionState.step;

    if (step === 'waitIfRecoverPossible' && !didHandleWaitIntentRef.current) {
      didHandleWaitIntentRef.current = true;
      if (actionState.cardType === 'technology') {
        sendPlayTechnologyCardActionIntent({
          progressCardId: actionState.cardId!,
          targetPosition: actionState.selectedPosition!,
        });
      } else {
        sendPlayClimateCardAction({
          progressCardId: actionState.cardId!,
        });
      }
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
      const card: ProgressCard = players
        .find((p) => p.id === currentPlayerId)!
        .handCards.find((c) => c.id === actionState.cardId)!;
      console.log('player', players.find((p) => p.id === currentPlayerId)?.name);
      console.log('cardId', actionState.cardId);
      const area =
        actionState.cardType === 'climateAction'
          ? 'climate-action'
          : card.type === 'technology'
            ? card.supply.technology.toLowerCase()
            : '';
      const index = actionState.selectedPosition!;
      const toRef = `${area}-${index}`;

      animateResourcesChange(actionState.resourceChange ?? 0);
      animateMoneyChange(actionState.moneyChange ?? 0, () => {
        setTimeout(() => {
          setGameState((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              players: prev.players.map((p) =>
                p.id === currentPlayerId
                  ? { ...p, handCards: p.handCards.filter((c) => c.id !== actionState.cardId) }
                  : p
              ),
            };
          });
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
    currentPlayerId,
    setSelectedAction,
  ]);

  return null;
}
