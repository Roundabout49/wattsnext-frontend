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
  gameId: string;
  playerName: string;
}

export interface StartGameRequest {
  gameId: string;
}

export interface CreateOrJoinGameResponse {
  game: Game; // actually GameInit
  playerId: string;
}
