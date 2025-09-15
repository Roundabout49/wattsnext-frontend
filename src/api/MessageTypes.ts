import { Player } from '../types/Game';

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

export interface CreateGameResponse {
  gameId: string;
  // player without handcards
  player: Player;
}
