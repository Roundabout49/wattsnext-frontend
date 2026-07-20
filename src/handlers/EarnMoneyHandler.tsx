import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { useDieAnimation } from '../context/DieAnimationContext';
import { useGame } from '../context/GameContext';
import { useActionStep } from '../hooks/useActionStep';
import { DIE_ROLLING_MS, DIE_SHOWING_RESULT_MS } from '../animationTimings';

export function EarnMoneyHandler() {
  const { actionState, dispatchGameAction } = useAction();
  const { sendEarnMoneyAction: sendEarnMoney } = useSendMessage();
  const { setShowDieAnimation, setDieAnimationData, setDieAnimationStep } = useDieAnimation();
  const { game: gameState } = useGame();

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
    }, DIE_ROLLING_MS);

    // FINISH_ACTION applies the server state; the money display then ticks up visibly
    setTimeout(() => {
      setShowDieAnimation(false);
      dispatchGameAction({ type: 'CLEANUP_ACTION' });
    }, DIE_ROLLING_MS + DIE_SHOWING_RESULT_MS);
  });

  useActionStep(actionState, 'earnMoney', 'done', () => {
    dispatchGameAction({ type: 'FINISH_ACTION' });
  });

  return null;
}
