import { EventCard } from './EventCards';
import { ClimateActionCard, ProgressCard } from './ProgressCards';

export interface Game {
  state: GameState;
  money: number;
  resources: number;
  currentPlayerId: string;
  players: Player[];
  board: Board;
  phaseIndex: number;
  turnInPhase: number;
  turnsPerPhase: number;
  phases: PhaseObjective[];
  // technologySizes: TechnologyEnergyMatrix;
}

export enum GameState {
  PREPARING = 'PREPARING',
  RUNNING = 'RUNNING',
  WON = 'WON',
  LOST = 'LOST',
  CANCELLED = 'CANCELLED',
}

export interface Player {
  id: string;
  name: string;
  handCards: ProgressCard[];
}

export interface Board {
  climateActionCards: [
    ClimateActionCard | null,
    ClimateActionCard | null,
    ClimateActionCard | null,
    ClimateActionCard | null,
    ClimateActionCard | null,
    ClimateActionCard | null,
    ClimateActionCard | null,
    ClimateActionCard | null,
    ClimateActionCard | null,
    ClimateActionCard | null,
  ];
  generationCards: [ProgressCard | null, ProgressCard | null, ProgressCard | null];
  storageCards: [ProgressCard | null, ProgressCard | null, ProgressCard | null];
  distributionCards: [ProgressCard | null, ProgressCard | null, ProgressCard | null];
  eventCards: [EventCard | null, EventCard | null];
  catastropheCard: EventCard | null;
}

interface PhaseObjective {
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

/* type TechnologyEnergyMatrix = {
  [tech in TechnologyType]: {
    [energy in EnergyForm]: number;
  };
}; */
