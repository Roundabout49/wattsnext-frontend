import * as gameApi from '../api/gameApi';
import {
  CancelGameRequest,
  CreateGameRequest,
  CreateOrJoinGameResponse,
  JoinGameRequest,
  LeaveGameRequest,
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
    leaveGame(req: LeaveGameRequest): Promise<boolean> {
      return gameApi.leaveGame(req);
    },
    startGame(req: StartGameRequest): Promise<void> {
      return gameApi.startGame(req);
    },
    cancelGame(req: CancelGameRequest): Promise<boolean> {
      return gameApi.cancelGame(req);
    },
  };
}
