import { useEffect } from 'react';
import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { useDieAnimation } from '../context/DieAnimationContext';
import { useGame } from '../context/GameContext';

export function EarnMoneyHandler() {
  const { actionState, dispatchGameAction } = useAction();
  const { sendEarnMoney } = useSendMessage();
  const { setShowDieAnimation, setDieAnimationData, setDieAnimationStep } = useDieAnimation();
  const { gameState } = useGame();
  const currentPlayer = gameState.players.find((player) => player.id === gameState.currentPlayerId);

  useEffect(() => {
    if (actionState === null || actionState.type !== 'earnMoney') return;

    if (actionState.step === 'waitForGameState') {
      sendEarnMoney();
    } else if (actionState.step === 'done') {
      console.log('Geld verdient:', actionState.amount);
      setShowDieAnimation(true);
      setDieAnimationData({
        playerName: currentPlayer?.name || 'Unbekannter Spieler',
        result: actionState.amount || 0,
        duration: 2000,
      });

      setTimeout(() => {
        setDieAnimationStep('showResult');
      }, 3000);

      setTimeout(() => {
        // animateMoneyGain(actionState.amount); // zähle Geld langsam hoch
        setShowDieAnimation(false);
        dispatchGameAction({
          type: 'FINISH_ACTION',
        });
      }, 5000);
    }
  }, [actionState, sendEarnMoney]);

  return null;
}
