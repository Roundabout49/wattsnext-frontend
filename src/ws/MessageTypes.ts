import { TechnologyType } from '../types/TechnologyTypes';

export interface RecoverPossiblePayload {
  cardId: string;
  position: [TechnologyType, number];
}

export interface PlayCardPayload {
  cardId: string;
  position: number;
  recover: boolean;
}

export interface EarnMoneyPayload {}
