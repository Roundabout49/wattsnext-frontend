import { EnergyType } from './EnergyTypes';
import { EventCard } from './EventCards';
import { Move } from './Move';
import { ClimateActionCardProps, ProgressCardProps } from './ProgressCards';
import { TechnologyType } from './TechnologyTypes';

export interface GameState {
  players: Player[];
  currentPlayerName: string;
  chosenAction?: Move;
  board: BoardProps;
  money: number;
  resources: number;
  progressPoints: number;
  technologySizes: TechnologyEnergyMatrix;
  phase: number;
  turn: number;
  turnsInPhase: number;
  phaseObjectives: PhaseObjectives;
}

export interface Player {
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
  technologyTypes: Record<TechnologyType, number>;
  energyTypes: EnergyType[];
}

type TechnologyEnergyMatrix = {
  [tech in TechnologyType]: {
    [energy in EnergyType]: number;
  };
};
