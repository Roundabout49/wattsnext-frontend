import * as gameApi from '../api/gameApi';
import {
  CreateGameRequest,
  CreateOrJoinGameResponse,
  JoinGameRequest,
  StartGameRequest,
} from '../api/MessageTypes';
import { GameApiService } from './GameApiService';

export function useHttpGameApiService(): GameApiService {
  return {
    createGame(req: CreateGameRequest): Promise<CreateOrJoinGameResponse> {
      return gameApi.createGame(req);
    },
    joinGame(req: JoinGameRequest): Promise<CreateOrJoinGameResponse> {
      return gameApi.joinGame(req);
    },
    startGame(req: StartGameRequest): Promise<void> {
      return gameApi.startGame(req);
    },
  };
}
