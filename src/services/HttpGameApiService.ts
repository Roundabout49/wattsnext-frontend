import * as gameApi from '../api/gameApi';
import {
  CreateGameRequest,
  CreateGameResponse,
  JoinGameRequest,
  StartGameRequest,
} from '../api/MessageTypes';
import { Player } from '../types/Game';
import { GameApiService } from './GameApiService';

export function useHttpGameApiService(): GameApiService {
  return {
    createGame(req: CreateGameRequest): Promise<CreateGameResponse> {
      return gameApi.createGame(req);
    },
    joinGame(req: JoinGameRequest): Promise<Player> {
      return gameApi.joinGame(req);
    },
    startGame(req: StartGameRequest): Promise<void> {
      return gameApi.startGame(req);
    },
  };
}
