import {
  CreateGameRequest,
  CreateGameResponse,
  JoinGameRequest,
  StartGameRequest,
} from '../api/MessageTypes';
import { Player } from '../types/Game';

export interface GameApiService {
  createGame(req: CreateGameRequest): Promise<CreateGameResponse>;
  joinGame(req: JoinGameRequest): Promise<Player>;
  startGame(req: StartGameRequest): Promise<void>;
}
