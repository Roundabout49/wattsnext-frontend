import { GameState } from '../types/GameState';

export interface PlayCardIntentMessage {
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

export interface PlayCardIntentResult {
  playerId: string;
  playPossible: boolean;
  recoverPossible: boolean;
  // TODO: More information about additional cost and recoverable resources?
}

export interface PlayCardResult {
  playerId: string;
  cardId: string;
  position: number;
  recover: boolean;
  newState: GameState;
  money: number;
  resources: number;
}

export type OutgoingMessage = PlayCardIntentMessage | PlayCardMessage | null;
