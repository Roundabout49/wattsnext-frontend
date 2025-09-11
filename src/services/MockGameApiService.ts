import {
  CreateGameRequest,
  CreateGameResponse,
  JoinGameRequest,
  StartGameRequest,
} from '../api/MessageTypes';
import { exampleGameState } from '../assets/ExampleData';
import { Game, GameState, Player } from '../types/Game';
import { GameApiService } from './GameApiService';

const mockGameId = '123e4567-e89b-12d3-a456-426614174000';
let mockPlayerCounter = 1;

export function useMockGameApiService(
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
): GameApiService {
  return {
    async createGame(request: CreateGameRequest): Promise<CreateGameResponse> {
      const playerId = `mock-player-${mockPlayerCounter++}`;
      const newGame = {
        ...exampleGameState,
        id: mockGameId,
        players: [
          { ...exampleGameState.players[0], id: playerId, name: request.playerName },
          ...exampleGameState.players.slice(1),
        ],
        currentPlayerId: playerId,
        state: GameState.PREPARING,
      };
      setGame(newGame);
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            gameId: mockGameId,
            player: {
              id: playerId,
              name: request.playerName,
              handCards: [],
            },
          });
        }, 300)
      );
    },

    async joinGame(request: JoinGameRequest): Promise<Player> {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            id: `mock-player-${mockPlayerCounter++}`,
            name: request.playerName,
            handCards: [],
          });
        }, 300)
      );
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async startGame(_request: StartGameRequest): Promise<void> {
      setGame((prev) => (prev ? { ...prev, state: GameState.RUNNING } : null));
      return new Promise((resolve) => setTimeout(() => resolve(), 300));
    },
  };
}
