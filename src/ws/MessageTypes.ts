import { GameState } from '../types/GameState';

export interface RecoverPossibleMessage {
  playerId: string;
  cardId: string;
  position: number;
}

export interface PlayCardMessage {
  playerId: string;
  cardId: string;
  position: number;
  recover: boolean;
}

export interface EarnMoneyResult {
  playerId: string;
  amount: number;
  newState: GameState;
}

export type OutgoingMessage = RecoverPossibleMessage | PlayCardMessage | null;
