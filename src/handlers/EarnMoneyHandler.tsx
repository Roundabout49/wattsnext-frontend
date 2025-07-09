import { useEffect, useRef } from 'react';
import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { useDieAnimation } from '../context/DieAnimationContext';
import { useGame } from '../context/GameContext';

export function EarnMoneyHandler() {
  const { actionState, dispatchGameAction, setSelectedAction } = useAction();
  const { sendEarnMoney } = useSendMessage();
  const { setShowDieAnimation, setDieAnimationData, setDieAnimationStep } = useDieAnimation();
  const { gameState, animateMoneyChange } = useGame();

  // Ref-Guards to make sure to only handle each step once
  const didHandleWaitRef = useRef(false);
  const didHandleDoneRef = useRef(false);

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

    if (step === 'done' && !didHandleDoneRef.current) {
      didHandleDoneRef.current = true;

      setShowDieAnimation(true);
      setDieAnimationData({
        playerName: currentPlayer?.name || 'Unbekannter Spieler',
        result: actionState.amount ?? 0,
      });
      setDieAnimationStep('rolling');

      setTimeout(() => setDieAnimationStep('showResult'), 3000);

      setTimeout(() => {
        setShowDieAnimation(false);
        animateMoneyChange(actionState.amount ?? 0, () => {
          dispatchGameAction({ type: 'FINISH_ACTION' });
          setSelectedAction(null);
        });
      }, 5000);
    }

    if (step !== 'done') {
      didHandleDoneRef.current = false;
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
