import {
  CancelGameRequest,
  CreateGameRequest,
  CreateOrJoinGameResponse,
  JoinGameRequest,
  LeaveGameRequest,
  StartGameRequest,
} from '../api/MessageTypes';

export interface GameApiService {
  createGame(req: CreateGameRequest): Promise<CreateOrJoinGameResponse>;
  joinGame(req: JoinGameRequest): Promise<CreateOrJoinGameResponse>;
  leaveGame(req: LeaveGameRequest): Promise<boolean>;
  startGame(req: StartGameRequest): Promise<void>;
  cancelGame(req: CancelGameRequest): Promise<boolean>;
}
