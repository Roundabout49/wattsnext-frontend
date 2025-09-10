import { Player } from '../types/Game';

export interface CreateGameRequest {
  gameMode: GameMode;
  playerName: string;
}

export enum GameMode {
  START_WITH_NUCLEAR,
  START_WITH_COAL,
}

export interface JoinGameRequest {
  gameId: string;
  playerName: string;
}

export interface StartGameRequest {
  gameId: string;
}

export interface CreateGameResponse {
  gameId: string;
  player: Player;
}
