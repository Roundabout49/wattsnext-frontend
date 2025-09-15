import {
  CreateGameRequest,
  CreateOrJoinGameResponse,
  JoinGameRequest,
  StartGameRequest,
} from '../api/MessageTypes';

export interface GameApiService {
  createGame(req: CreateGameRequest): Promise<CreateOrJoinGameResponse>;
  joinGame(req: JoinGameRequest): Promise<CreateOrJoinGameResponse>;
  startGame(req: StartGameRequest): Promise<void>;
}
