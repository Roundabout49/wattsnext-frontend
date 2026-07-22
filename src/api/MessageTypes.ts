import { Game } from '../types/Game';

export interface CreateGameRequest {
  gameMode: GameMode;
  playerName: string;
}

export enum GameMode {
  StartWithNuclear = 'StartWithNuclear',
  StartWithCoal = 'StartWithCoal',
}

export interface JoinGameRequest {
  shareCode: string;
  playerName: string;
}

export interface LeaveGameRequest {
  gameId: string;
  playerId: string;
}

export interface StartGameRequest {
  gameId: string;
}

export interface CancelGameRequest {
  gameId: string;
  playerId: string;
}

export interface CreateOrJoinGameResponse {
  game: Game; // actually GameInit
  playerId: string;
}
