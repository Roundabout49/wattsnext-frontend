import { cards } from '../data/cards';
import { GameState } from '../types/GameState';
import { ClimateActionCardProps, TechnologyCardProps } from '../types/ProgressCards';

export const climateActionCards: ClimateActionCardProps[] = [
  cards['CO2-Abscheidung und -Speicherung'] as ClimateActionCardProps,
  cards['H2-betriebene Schiffe'] as ClimateActionCardProps,
  cards['Power-to-X'] as ClimateActionCardProps,
];

export const generationCards: TechnologyCardProps[] = [
  cards['Photovoltaik auf dem Dach'] as TechnologyCardProps,
];

export const distributionCards: TechnologyCardProps[] = [
  cards['Fernwärmenetz'] as TechnologyCardProps,
];

export const storageCards: TechnologyCardProps[] = [
  cards['Großer Wasserstoffspeicher'] as TechnologyCardProps,
];

export const exampleGameState: GameState = {
  players: [
    {
      id: 'player1',
      name: 'Bob',
      hand: [generationCards[0], climateActionCards[0], climateActionCards[1]],
    },
    {
      id: 'player2',
      name: 'Alice',
      hand: [climateActionCards[2], storageCards[0], distributionCards[0]],
    },
  ],
  currentPlayerId: 'player1',
  board: {
    climateActions: [
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
    generation: [generationCards[0], null, null],
    storage: [storageCards[0], null, null],
    distribution: [distributionCards[0], null, null],
    event: null,
    badEvent: null,
  },
  money: 5,
  resources: 13,
  progressPoints: 17,
  technologySizes: {
    Storage: { Electricity: 2, Heat: 0 },
    Generation: { Electricity: 4, Heat: 0 },
    Distribution: { Electricity: 3, Heat: 0 },
  },
  phase: 1,
  turn: 8,
  turnsInPhase: 12,
  phaseObjectives: {
    1: {
      objective: {
        progressPoints: 25,
        technologyTypes: {
          Generation: 3,
          Distribution: 3,
          Storage: 0,
        },
        energyTypes: ['Electricity', 'Heat'],
      },
    },
    2: {
      objective: {
        progressPoints: 50,
        technologyTypes: {
          Generation: 6,
          Distribution: 6,
          Storage: 3,
        },
        energyTypes: ['Electricity', 'Heat'],
      },
    },
    3: {
      objective: {
        progressPoints: 75,
        technologyTypes: {
          Generation: 9,
          Distribution: 9,
          Storage: 6,
        },
        energyTypes: ['Electricity', 'Heat'],
      },
    },
  },
  canSearchPile: false,
};
