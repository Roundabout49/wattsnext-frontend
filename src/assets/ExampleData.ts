import { cards } from '../data/cards';
import { Game } from '../types/Game';
import { ClimateActionCard, TechnologyCard } from '../types/ProgressCards';

export const climateActionCards: ClimateActionCard[] = [
  cards['CO2-Abscheidung und -Speicherung'] as ClimateActionCard,
  cards['H2-betriebene Schiffe'] as ClimateActionCard,
  cards['Power-to-X'] as ClimateActionCard,
];

export const generationCards: TechnologyCard[] = [
  cards['Photovoltaik auf dem Dach'] as TechnologyCard,
];

export const distributionCards: TechnologyCard[] = [cards['Fernwärmenetz'] as TechnologyCard];

export const storageCards: TechnologyCard[] = [
  cards['Großer Wasserstoffspeicher'] as TechnologyCard,
];

export const exampleGameState: Game = {
  players: [
    {
      id: 'player1',
      name: 'Bob',
      handCards: [generationCards[0], climateActionCards[0], climateActionCards[1]],
    },
    {
      id: 'player2',
      name: 'Alice',
      handCards: [climateActionCards[2], storageCards[0], distributionCards[0]],
    },
  ],
  currentPlayerId: 'player1',
  board: {
    climateActionCards: [
      climateActionCards[0],
      climateActionCards[1],
      climateActionCards[2],
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    generationCards: [generationCards[0], null, null],
    storageCards: [storageCards[0], null, null],
    distributionCards: [distributionCards[0], null, null],
    eventCards: null,
    catastropheCard: null,
  },
  money: 5,
  resources: 13,
  progressPoints: 17,
  technologySizes: {
    Storage: { Electricity: 2, Heat: 0 },
    Generation: { Electricity: 4, Heat: 0 },
    Distribution: { Electricity: 3, Heat: 0 },
  },
  phaseIndex: 1,
  turnInPhase: 8,
  turnsPerPhase: 12,
  phases: {
    1: {
      objective: {
        progressPoints: 25,
        technologyTypesAim: {
          Generation: 3,
          Distribution: 3,
          Storage: 0,
        },
        technologyTypesHave: {
          Generation: 2,
          Distribution: 1,
          Storage: 0,
        },
        energyTypes: {
          Electricity: true,
          Heat: false,
        },
      },
    },
    2: {
      objective: {
        progressPoints: 50,
        technologyTypesAim: {
          Generation: 6,
          Distribution: 6,
          Storage: 3,
        },
        technologyTypesHave: {
          Generation: 2,
          Distribution: 1,
          Storage: 0,
        },
        energyTypes: {
          Electricity: true,
          Heat: false,
        },
      },
    },
    3: {
      objective: {
        progressPoints: 75,
        technologyTypesAim: {
          Generation: 9,
          Distribution: 9,
          Storage: 6,
        },
        technologyTypesHave: {
          Generation: 2,
          Distribution: 1,
          Storage: 0,
        },
        energyTypes: {
          Electricity: true,
          Heat: false,
        },
      },
    },
  },
  canSearchPile: false,
};
