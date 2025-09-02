import { cards } from '../data/cards';
import { Game, GameState } from '../types/Game';
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
    generationCards: [generationCards[0], null, null],
    distributionCards: [distributionCards[0], null, null],
    storageCards: [storageCards[0], null, null],
    climateActionCards: [climateActionCards[0], climateActionCards[1], climateActionCards[2]],
    eventCards: [],
    catastropheCard: null,
  },
  money: 5,
  resources: 13,
  progressCardPileSize: 0,
  phaseIndex: 1,
  turnInPhase: 8,
  turnsPerPhase: 12,
  phases: [
    {
      generation: { value: 2, target: 3 },
      distribution: { value: 1, target: 3 },
      storage: { value: 0, target: 0 },
      progressPoints: { value: 17, target: 25 },
      electricity: { value: 1, target: 1 },
      heat: { value: 0, target: 1 },
    },
    {
      generation: { value: 2, target: 6 },
      distribution: { value: 1, target: 6 },
      storage: { value: 0, target: 3 },
      progressPoints: { value: 25, target: 50 },
      electricity: { value: 1, target: 1 },
      heat: { value: 0, target: 1 },
    },
    {
      generation: { value: 2, target: 9 },
      distribution: { value: 1, target: 9 },
      storage: { value: 0, target: 6 },
      progressPoints: { value: 50, target: 75 },
      electricity: { value: 1, target: 1 },
      heat: { value: 0, target: 1 },
    },
  ],
  state: GameState.PREPARING,
};
