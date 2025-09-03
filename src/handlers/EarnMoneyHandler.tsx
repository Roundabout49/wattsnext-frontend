import { useEffect, useRef } from 'react';
import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { useDieAnimation } from '../context/DieAnimationContext';
import { useGame } from '../context/GameContext';

export function EarnMoneyHandler() {
  const { actionState, dispatchGameAction, setSelectedAction } = useAction();
  const { sendEarnMoneyAction: sendEarnMoney } = useSendMessage();
  const { setShowDieAnimation, setDieAnimationData, setDieAnimationStep } = useDieAnimation();
  const { game: gameState, animateMoneyChange } = useGame();

  // Ref-Guards to make sure to only handle each step once
  const didHandleWaitRef = useRef(false);
  const didHandleAnimateDieRef = useRef(false);

  const currentPlayer = gameState.players.find((p) => p.id === gameState.currentPlayerId);

  useEffect(() => {
    if (!actionState || actionState.type !== 'earnMoney') return;

    const step = actionState.step;

    if (step === 'waitForGameState' && !didHandleWaitRef.current) {
      didHandleWaitRef.current = true;
      sendEarnMoney();
    }
    if (step !== 'waitForGameState') {
      didHandleWaitRef.current = false;
    }

    if (step === 'animateDie' && !didHandleAnimateDieRef.current) {
      didHandleAnimateDieRef.current = true;

      setShowDieAnimation(true);
      setDieAnimationData({
        playerName: currentPlayer?.name || 'Unbekannter Spieler',
        result: actionState.amount ?? 0,
      });
      setDieAnimationStep('rolling');

      setTimeout(() => {
        setDieAnimationStep('showResult');
        dispatchGameAction({ type: 'DIE_ANIMATION_FINISHED' });
      }, 2000);

      setTimeout(() => {
        setShowDieAnimation(false);
        animateMoneyChange(actionState.amount ?? 0, () => {
          setTimeout(() => dispatchGameAction({ type: 'FINISH_ACTION' }), 1000);
        });
      }, 4000);
    }

    if (step !== 'animateDie') {
      didHandleAnimateDieRef.current = false;
    }
  }, [
    actionState,
    sendEarnMoney,
    setShowDieAnimation,
    setDieAnimationData,
    setDieAnimationStep,
    animateMoneyChange,
    dispatchGameAction,
    setSelectedAction,
    currentPlayer,
  ]);

  return null;
}
