import { useAction } from '../context/ActionContext';
import { useGame } from '../context/GameContext';
import { cards } from '../data/cards';
import { Game, Player } from '../types/Game';
import {
  handleEarnMoneyResult,
  handlePlayClimateCardResult,
  handlePlayTechnologyCardIntentResult,
  handlePlayTechnologyCardResult,
} from '../ws/MessageHandler';
import {
  PlayTechnologyCardActionRequest,
  PlayTechnologyCardActionIntentRequest,
  ResponseStatus,
  PlayClimateCardActionRequest,
} from '../ws/MessageTypes';
import { SendMessageService } from './SendMessageService';
import { ClimateActionCard, TechnologyCard } from '../types/ProgressCards';

const getNextPlayer = (players: Player[], currentPlayerId: string): Player => {
  const currentPlayerIndex = players.findIndex((player) => player.id === currentPlayerId);
  return players[(currentPlayerIndex + 1) % players.length];
};

export function useMockSendMessageService(): SendMessageService {
  const { dispatchGameAction, actionState } = useAction();
  const { game } = useGame();

  return {
    sendPlayTechnologyCardActionIntent: (data: PlayTechnologyCardActionIntentRequest) => {
      console.log('[Mock] sendPlayCardIntent', data);
      const { progressCardId } = data;
      const card = cards[progressCardId];

      handlePlayTechnologyCardIntentResult(
        {
          game: game,
          status: ResponseStatus.OK,
          information: {
            canRecycle: false,
            moneyForPlayingCard: card.moneyCosts.modifiedValue,
            resourcesForPlayingCard: card.resourceCosts.modifiedValue,
          },
        },
        dispatchGameAction
      );

      dispatchGameAction({
        type: 'PLAY_CARD_SET_CAN_RECOVER',
        canRecover: false,
      });
    },

    sendPlayTechnologyCardAction: (data: PlayTechnologyCardActionRequest) => {
      console.log('[Mock] sendPlayCard', data);

      if (
        actionState?.type !== 'playCard' ||
        !actionState.cardId ||
        !actionState.selectedPosition
      ) {
        console.error('No card selected');
        return;
      }

      const cardId = actionState.cardId;
      const card: TechnologyCard = cards[cardId] as TechnologyCard;
      const position = actionState.selectedPosition;

      // update player
      const nextPlayer = getNextPlayer(game.players, game.currentPlayerId);

      // Update board
      const updatedGeneration = [
        ...game.board.generationCards,
      ] as typeof game.board.generationCards;
      if (card.type === 'technology' && card.supply.technology === 'Generation') {
        updatedGeneration[position] = card;
      }

      const updatedStorage = [...game.board.storageCards] as typeof game.board.storageCards;
      if (card.type === 'technology' && card.supply.technology === 'Storage') {
        updatedStorage[position] = card;
      }

      const updatedDistribution = [
        ...game.board.distributionCards,
      ] as typeof game.board.distributionCards;
      if (card.type === 'technology' && card.supply.technology === 'Distribution') {
        updatedDistribution[position] = card;
      }

      const newCardKey = Object.keys(cards)[Math.floor(Math.random() * Object.keys(cards).length)];
      const newCard = cards[newCardKey];
      console.log('[Mock] New Card:', newCard);

      const newGameState: Game = {
        ...game,
        players: game.players.map((player) => {
          if (player.id === game.currentPlayerId) {
            return {
              ...player,
              handCards: player.handCards.filter((c) => c.name !== cardId).concat(newCard),
            };
          }
          return player;
        }),
        currentPlayerId: nextPlayer.id,
        board: {
          ...game.board,
          generationCards: updatedGeneration,
          storageCards: updatedStorage,
          distributionCards: updatedDistribution,
        },
        money: game.money - card.moneyCosts.modifiedValue,
        resources: game.resources - card.resourceCosts.modifiedValue,
        phases: game.phases.map((phase, index) =>
          index === game.phaseIndex
            ? {
                ...phase,
                progressPoints: {
                  ...phase.progressPoints,
                  value:
                    phase.progressPoints.value +
                    (card.points?.modifiedValue.systemProgressPoints || 0),
                },
              }
            : phase
        ),
        /* technologySizes:
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
            : gameState.technologySizes,*/
        turnInPhase: game.turnInPhase + 1,
      };
      handlePlayTechnologyCardResult(
        {
          game: newGameState,
          status: ResponseStatus.OK,
          information: {
            playedCard: card,
            targetPosition: position,
            drawnCard: newCard,
            payedMoneyForCard: card.moneyCosts.modifiedValue,
            payedResourcesForCard: card.resourceCosts.modifiedValue,
            didRecycle: false,
          },
        },
        dispatchGameAction
      );
    },

    // TODO: implement
    sendPlayClimateCardAction: (data: PlayClimateCardActionRequest) => {
      console.log('[Mock] sendPlayClimateCard', data);
      const { progressCardId } = data;
      const card = cards[progressCardId] as ClimateActionCard;

      // update player
      const nextPlayer = getNextPlayer(game.players, game.currentPlayerId);

      const newCardKey = Object.keys(cards)[Math.floor(Math.random() * Object.keys(cards).length)];
      const newCard = cards[newCardKey];
      console.log('[Mock] New Card:', newCard);

      const newGameState: Game = {
        ...game,
        players: game.players.map((player) => {
          if (player.id === game.currentPlayerId) {
            return {
              ...player,
              handCards: player.handCards.filter((c) => c.name !== progressCardId).concat(newCard),
            };
          }
          return player;
        }),
        currentPlayerId: nextPlayer.id,
        board: {
          ...game.board,
          climateActionCards: [...game.board.climateActionCards, card],
        },
        money: game.money - card.moneyCosts.modifiedValue,
        resources: game.resources - card.resourceCosts.modifiedValue,
        phases: game.phases.map((phase, index) =>
          index === game.phaseIndex
            ? {
                ...phase,
                progressPoints: {
                  ...phase.progressPoints,
                  value:
                    phase.progressPoints.value +
                    (card.points?.modifiedValue.systemProgressPoints || 0),
                },
              }
            : phase
        ),
        /* technologySizes:
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
            : gameState.technologySizes,*/
        turnInPhase: game.turnInPhase + 1,
      };
      handlePlayClimateCardResult(
        {
          game: newGameState,
          status: ResponseStatus.OK,
          information: {
            playedCard: card,
            drawnCard: newCard,
            cardEffectInformations: [],
          },
        },
        dispatchGameAction
      );
    },

    sendEarnMoneyAction: () => {
      console.log('[Mock] sendEarnMoney');

      // update player
      const nextPlayer = getNextPlayer(game.players, game.currentPlayerId);

      const amount = Math.floor(Math.random() * 6) + 1;
      handleEarnMoneyResult(
        {
          game: {
            ...game,
            money: game.money + amount,
            currentPlayerId: nextPlayer.id,
            turnInPhase: game.turnInPhase + 1,
          },
          status: ResponseStatus.OK,
          information: {
            diceValue: amount,
          },
        },
        dispatchGameAction
      );
    },
  };
}
