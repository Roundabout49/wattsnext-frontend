import { useAction } from '../context/ActionContext';
import { useGame } from '../context/GameContext';
import { cards } from '../data/cards';
import { Player } from '../types/Game';
import {
  handleEarnMoneyResult,
  handlePlayTechnologyCardIntentResult,
  handlePlayTechnologyCardResult,
} from '../ws/MessageHandler';
import {
  PlayTechnologyCardActionRequest,
  PlayTechnologyCardActionIntentRequest,
} from '../ws/MessageTypes';
import { SendMessageService } from './SendMessageService';

const getNextPlayer = (players: Player[], currentPlayerId: string): Player => {
  const currentPlayerIndex = players.findIndex((player) => player.id === currentPlayerId);
  return players[(currentPlayerIndex + 1) % players.length];
};

export function useMockSendMessageService(): SendMessageService {
  const { dispatchGameAction } = useAction();
  const { gameState } = useGame();

  return {
    sendPlayCardIntent: (data: PlayTechnologyCardActionIntentRequest) => {
      console.log('[Mock] sendPlayCardIntent', data);

      handlePlayTechnologyCardIntentResult(
        {
          playerId: data.playerId,
          playPossible: true,
          recoverPossible: false, // TODO: also test true
        },
        dispatchGameAction
      );

      dispatchGameAction({
        type: 'PLAY_CARD_SET_CAN_RECOVER',
        canRecover: false,
      });
    },

    sendPlayCard: (data: PlayTechnologyCardActionRequest) => {
      console.log('[Mock] sendPlayCard', data);

      const { cardId, position, shallRecycle: recover } = data;
      const card = cards[cardId];

      // update player
      const nextPlayer = getNextPlayer(gameState.players, gameState.currentPlayerId);

      // Update board
      const updatedClimateActions = [
        ...gameState.board.climateActionCards,
      ] as typeof gameState.board.climateActionCards;
      if (card.type === 'climateAction') {
        updatedClimateActions[position] = card;
      }

      const updatedGeneration = [
        ...gameState.board.generationCards,
      ] as typeof gameState.board.generationCards;
      if (card.type === 'technology' && card.supply.technology === 'Generation') {
        updatedGeneration[position] = card;
      }

      const updatedStorage = [
        ...gameState.board.storageCards,
      ] as typeof gameState.board.storageCards;
      if (card.type === 'technology' && card.supply.technology === 'Storage') {
        updatedStorage[position] = card;
      }

      const updatedDistribution = [
        ...gameState.board.distributionCards,
      ] as typeof gameState.board.distributionCards;
      if (card.type === 'technology' && card.supply.technology === 'Distribution') {
        updatedDistribution[position] = card;
      }

      const newCardKey = Object.keys(cards)[Math.floor(Math.random() * Object.keys(cards).length)];
      const newCard = cards[newCardKey];
      console.log('[Mock] New Card:', newCard);

      const newGameState = {
        ...gameState,
        players: gameState.players.map((player) => {
          if (player.id === gameState.currentPlayerId) {
            return {
              ...player,
              handCards: player.handCards.filter((c) => c.name !== cardId).concat(newCard),
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
        money: gameState.money - card.moneyCosts,
        resources: gameState.resources - card.resourceCosts,
        progressPoints: gameState.progressPoints + (card.points?.systemProgressPoints || 0),
        technologySizes:
          card.type === 'technology'
            ? {
                ...gameState.technologySizes,
                [card.supply.technology]: {
                  ...gameState.technologySizes[card.supply.technology],
                  [card.supply.energy]:
                    (gameState.technologySizes[card.supply.technology][card.supply.energy] || 0) +
                    card.supply.size,
                },
              }
            : gameState.technologySizes,
        turn: gameState.turnInPhase + 1,
      };
      handlePlayTechnologyCardResult(
        {
          playerId: gameState.currentPlayerId,
          cardId: cardId,
          position: position,
          recover: recover,
          newState: newGameState,
          money: -1 * card.moneyCosts,
          resources: -1 * card.resourceCosts,
        },
        dispatchGameAction
      );
    },

    sendEarnMoney: () => {
      console.log('[Mock] sendEarnMoney');

      // update player
      const nextPlayer = getNextPlayer(gameState.players, gameState.currentPlayerId);

      const amount = Math.floor(Math.random() * 6) + 1;
      handleEarnMoneyResult(
        {
          playerId: gameState.currentPlayerId,
          diceValue: amount,
          newState: {
            ...gameState,
            money: gameState.money + amount,
            currentPlayerId: nextPlayer.id,
            turnInPhase: gameState.turnInPhase + 1,
          },
        },
        dispatchGameAction
      );
    },
  };
}
