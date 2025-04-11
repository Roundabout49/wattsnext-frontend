import { EventCard } from './EventCards';
import { ClimateActionCardProps, ProgressCardProps } from './ProgressCards';

export interface GameState {
  players: Player[];
  board: BoardProps;
  money: number;
  resources: number;
  drawPileProgress: ProgressCardProps[];
  drawPileEvents: EventCard[];
  drawPileBadEvents: EventCard[];
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
