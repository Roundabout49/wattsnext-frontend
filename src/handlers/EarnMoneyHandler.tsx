import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { useDieAnimation } from '../context/DieAnimationContext';
import { useGame } from '../context/GameContext';
import { useActionStep } from '../hooks/useActionStep';

export function EarnMoneyHandler() {
  const { actionState, dispatchGameAction } = useAction();
  const { sendEarnMoneyAction: sendEarnMoney } = useSendMessage();
  const { setShowDieAnimation, setDieAnimationData, setDieAnimationStep } = useDieAnimation();
  const { game: gameState, animateMoneyChange } = useGame();

  const currentPlayer = gameState?.players.find((p) => p.id === gameState.currentPlayerId);

  useActionStep(actionState, 'earnMoney', 'waitForGameState', () => {
    sendEarnMoney();
  });

  useActionStep(actionState, 'earnMoney', 'animateDie', (state) => {
    setShowDieAnimation(true);
    setDieAnimationData({
      playerName: currentPlayer?.name || 'Unbekannter Spieler',
      result: state.amount ?? 0,
    });
    setDieAnimationStep('rolling');

    setTimeout(() => {
      setDieAnimationStep('showResult');
      dispatchGameAction({ type: 'DIE_ANIMATION_FINISHED' });
    }, 2000);

    setTimeout(() => {
      setShowDieAnimation(false);
      animateMoneyChange(state.amount ?? 0, () => {
        setTimeout(() => dispatchGameAction({ type: 'CLEANUP_ACTION' }), 1000);
      });
    }, 4000);
  });

  useActionStep(actionState, 'earnMoney', 'done', () => {
    dispatchGameAction({ type: 'FINISH_ACTION' });
  });

  return null;
}
