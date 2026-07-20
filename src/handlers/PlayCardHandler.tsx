import { useAction } from '../context/ActionContext';
import { useSendMessage } from '../context/SendMessageContext';
import { useGame } from '../context/GameContext';
import { useCardAnimation } from '../context/CardAnimationContext';
import ProgressCardSmall from '../components/cards/ProgressCardSmall';
import { Player } from '../types/Game';
import { ProgressCard } from '../types/ProgressCards';
import { getBoardPositionDomId, getHandCardDomId } from '../utils/cardDomId';
import { useActionStep } from '../hooks/useActionStep';

export function PlayCardHandler() {
  const { actionState, dispatchGameAction } = useAction();
  const {
    sendPlayTechnologyCardActionIntent,
    sendPlayTechnologyCardAction,
    sendPlayClimateCardAction,
  } = useSendMessage();
  const { setGame: setGameState, game } = useGame();
  const { startCardAnimation } = useCardAnimation();

  const players: Player[] = game ? game.players : [];
  const currentPlayerId: string | null = game ? game.currentPlayerId : null;

  useActionStep(actionState, 'playCard', 'waitIfRecoverPossible', (state) => {
    if (state.cardType === 'technology') {
      sendPlayTechnologyCardActionIntent({
        progressCardId: state.cardId!,
        targetPosition: state.selectedPosition!,
      });
    }
  });

  useActionStep(actionState, 'playCard', 'waitForGameState', (state) => {
    if (state.cardType === 'technology') {
      sendPlayTechnologyCardAction({
        shallRecycle: state.recoverResources!,
      });
    } else if (state.cardType === 'climateAction') {
      sendPlayClimateCardAction({
        climateCardId: state.cardId!,
      });
    }
  });

  useActionStep(actionState, 'playCard', 'animatePlayCard', (state) => {
    const fromRef = getHandCardDomId(state.cardId!);
    const card: ProgressCard = players
      .find((p) => p.id === currentPlayerId)!
      .handCards.find((c) => c.id === state.cardId)!;
    const area =
      state.cardType === 'climateAction'
        ? 'climate-action'
        : card.type === 'technology'
          ? card.supply.modifiedValue.technology
          : '';
    const index = state.selectedPosition!;
    const toRef = getBoardPositionDomId(area, index);

    // Local hand-card removal for the flight; FINISH_ACTION applies the server state afterwards
    setGameState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        players: prev.players.map((p) =>
          p.id === currentPlayerId
            ? { ...p, handCards: p.handCards.filter((c) => c.id !== state.cardId) }
            : p
        ),
      };
    });
    startCardAnimation(fromRef, toRef, <ProgressCardSmall card={card} />, () =>
      dispatchGameAction({ type: 'CLEANUP_ACTION' })
    );
  });

  useActionStep(actionState, 'playCard', 'done', () => {
    dispatchGameAction({ type: 'FINISH_ACTION' });
  });

  return null;
}
