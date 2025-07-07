import { useAction } from '../context/ActionContext';
import { useGame } from '../context/GameContext';
import { cards } from '../data/cards';
import { PlayCardMessage, RecoverPossibleMessage } from '../ws/MessageTypes';
import { SendMessageService } from './SendMessageService';

export function useMockSendMessageService(): SendMessageService {
  const { dispatchGameAction } = useAction();
  const { gameState, setGameState } = useGame();

  return {
    sendPlayCardIntent: (data: RecoverPossibleMessage) => {
      console.log('[Mock] sendPlayCardIntent', data);
      dispatchGameAction({
        type: 'PLAY_CARD_SET_CAN_RECOVER',
        canRecover: false,
      });
    },

    sendPlayCard: (data: PlayCardMessage) => {
      console.log('[Mock] sendPlayCard', data);

      const { cardId, position /*recoverResources*/ } = data;
      const card = cards[cardId];

      // update player
      const currentPlayerIndex = gameState.players.findIndex(
        (player) => player.id === gameState.currentPlayerId
      );
      const nextPlayerIndex = (currentPlayerIndex + 1) % gameState.players.length;
      const nextPlayer = gameState.players[nextPlayerIndex];

      // Update board
      const updatedClimateActions = [
        ...gameState.board.climateActions,
      ] as typeof gameState.board.climateActions;
      if (card.type === 'climateAction') {
        updatedClimateActions[position] = card;
      }

      const updatedGeneration = [
        ...gameState.board.generation,
      ] as typeof gameState.board.generation;
      if (card.type === 'technology' && card.energyCharacteristics.technology === 'Generation') {
        updatedGeneration[position] = card;
      }

      const updatedStorage = [...gameState.board.storage] as typeof gameState.board.storage;
      if (card.type === 'technology' && card.energyCharacteristics.technology === 'Storage') {
        updatedStorage[position] = card;
      }

      const updatedDistribution = [
        ...gameState.board.distribution,
      ] as typeof gameState.board.distribution;
      if (card.type === 'technology' && card.energyCharacteristics.technology === 'Distribution') {
        updatedDistribution[position] = card;
      }

      setGameState({
        ...gameState,
        players: gameState.players.map((player) => {
          if (player.id === gameState.currentPlayerId) {
            return {
              ...player,
              hand: player.hand.filter((c) => c.title !== cardId),
            };
          }
          return player;
        }),
        currentPlayerId: nextPlayer.id,
        board: {
          ...gameState.board,
          climateActions: updatedClimateActions,
          generation: updatedGeneration,
          storage: updatedStorage,
          distribution: updatedDistribution,
        },
        money: gameState.money - card.price,
        resources: gameState.resources - card.resources,
        progressPoints: gameState.progressPoints + (card.points?.systemPoints || 0),
        technologySizes:
          card.type === 'technology'
            ? {
                ...gameState.technologySizes,
                [card.energyCharacteristics.technology]: {
                  ...gameState.technologySizes[card.energyCharacteristics.technology],
                  [card.energyCharacteristics.energy]:
                    (gameState.technologySizes[card.energyCharacteristics.technology][
                      card.energyCharacteristics.energy
                    ] || 0) + card.energyCharacteristics.size,
                },
              }
            : gameState.technologySizes,
        turn: gameState.turn + 1,
      });
    },

    sendEarnMoney: () => {
      console.log('[Mock] sendEarnMoney');
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      dispatchGameAction({ type: 'EARN_MONEY_SET_AMOUNT', amount: randomNumber });
    },
  };
}
