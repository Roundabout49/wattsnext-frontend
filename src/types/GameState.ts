import { EnergyType } from './EnergyTypes';
import { EventCard } from './EventCards';
import { ClimateActionCardProps, ProgressCardProps } from './ProgressCards';
import { TechnologyType } from './TechnologyTypes';

export interface GameState {
  players: Player[];
  currentPlayerId: string;
  // TODO: Add available actions (?)
  board: BoardProps;
  money: number;
  resources: number;
  progressPoints: number;
  technologySizes: TechnologyEnergyMatrix;
  phase: number;
  turn: number;
  turnsInPhase: number;
  phaseObjectives: PhaseObjectives;
  canSearchPile: boolean;
}

export interface Player {
  id: string;
  name: string;
  hand: ProgressCardProps[];
}

export interface BoardProps {
  climateActions: [
    ClimateActionCardProps | null,
    ClimateActionCardProps | null,
    ClimateActionCardProps | null,
    ClimateActionCardProps | null,
    ClimateActionCardProps | null,
    ClimateActionCardProps | null,
    ClimateActionCardProps | null,
    ClimateActionCardProps | null,
    ClimateActionCardProps | null,
    ClimateActionCardProps | null,
  ];
  generation: [ProgressCardProps | null, ProgressCardProps | null, ProgressCardProps | null];
  storage: [ProgressCardProps | null, ProgressCardProps | null, ProgressCardProps | null];
  distribution: [ProgressCardProps | null, ProgressCardProps | null, ProgressCardProps | null];
  event?: EventCard | null;
  badEvent?: EventCard | null;
}

export interface PhaseObjectives {
  [phase: number]: {
    objective: PhaseObjective;
  };
}

interface PhaseObjective {
  progressPoints: number;
  technologyTypesAim: Record<TechnologyType, number>;
  // current status for current and following phases, status at end of phase for past phases
  technologyTypesHave: Record<TechnologyType, number>;
  // required energy types and if they are/were fulfilled
  energyTypes: Record<EnergyType, boolean>;
}

type TechnologyEnergyMatrix = {
  [tech in TechnologyType]: {
    [energy in EnergyType]: number;
  };
};
