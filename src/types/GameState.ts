import { EnergyType } from './EnergyTypes';
import { EventCard } from './EventCards';
import { ClimateActionCardProps, ProgressCardProps } from './ProgressCards';
import { TechnologyType } from './TechnologyTypes';

export interface GameState {
  players: Player[];
  board: BoardProps;
  money: number;
  resources: number;
  progressPoints: number;
  technologySizes: TechnologyEnergyMatrix;
  drawPileProgress: ProgressCardProps[];
  drawPileEvents: EventCard[];
  drawPileBadEvents: EventCard[];
  phase: number;
  turn: number;
  turnsInPhase: number;
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

type TechnologyEnergyMatrix = {
  [tech in TechnologyType]: {
    [energy in EnergyType]: number;
  };
};
