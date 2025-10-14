import { EnergyForm } from './EnergyForms';
import { EventCard } from './EventCards';
import { ClimateActionCard, ProgressCard } from './ProgressCards';
import { TechnologyType } from './TechnologyTypes';

export interface Game {
  id: string;
  state: GameState;
  money: number;
  resources: number;
  currentPlayerId: string;
  players: Player[];
  board: Board;
  // phase and turn are 0-indexed
  phaseIndex: number;
  turnInPhase: number;
  turnsPerPhase: number;
  phases: PhaseObjective[];
  progressCardPileSize: number;
  // technologySizes: TechnologyEnergyMatrix;
}

export enum GameState {
  Preparing = 'Preparing',
  Running = 'Running',
  Won = 'Won',
  Lost = 'Lost',
  Cancelled = 'Cancelled',
}

export interface Player {
  id: string;
  name: string;
  handCards: ProgressCard[];
}

export interface Board {
  generationCards: [ProgressCard | null, ProgressCard | null, ProgressCard | null];
  distributionCards: [ProgressCard | null, ProgressCard | null, ProgressCard | null];
  storageCards: [ProgressCard | null, ProgressCard | null, ProgressCard | null];
  // It's just a list of maximum length 10, not always length 10
  climateActionCards: ClimateActionCard[];
  eventCards: EventCard[];
  catastropheCard: EventCard | null;
}

export interface PhaseObjective {
  generation: TargetableValue;
  distribution: TargetableValue;
  storage: TargetableValue;
  progressPoints: TargetableValue;
  // electricity and heat are actually booleans, so a target of 1 means required and is fulfilled when value > 0
  electricity: TargetableValue;
  heat: TargetableValue;
}

interface TargetableValue {
  value: number;
  target: number;
}

export type TechnologyEnergyMatrix = {
  [tech in TechnologyType]: {
    [energy in EnergyForm]: number;
  };
};
