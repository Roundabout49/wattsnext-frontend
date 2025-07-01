import { TechnologyType } from '../types/TechnologyTypes';

export interface RecoverPossibleMessage {
  cardId: string;
  position: [TechnologyType, number];
}

export interface PlayCardMessage {
  cardId: string;
  position: number;
  recover: boolean;
}

export interface EarnMoneyMessage {}

export type OutgoingMessage = RecoverPossibleMessage | PlayCardMessage | EarnMoneyMessage;
