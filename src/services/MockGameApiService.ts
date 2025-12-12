import {
  CancelGameRequest,
  CreateGameRequest,
  CreateOrJoinGameResponse,
  JoinGameRequest,
  LeaveGameRequest,
  StartGameRequest,
} from '../api/MessageTypes';
import { exampleGameState } from '../assets/ExampleData';
import { Game, GameState } from '../types/Game';
import { GameApiService } from './GameApiService';

const mockGameId = '123e4567-e89b-12d3-a456-426614174000';
let mockPlayerCounter = 1;

export function useMockGameApiService(
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
): GameApiService {
  return {
    async createGame(request: CreateGameRequest): Promise<CreateOrJoinGameResponse> {
      const playerId = `mock-player-${mockPlayerCounter++}`;
      const newGame = {
        ...exampleGameState,
        id: mockGameId,
        players: [
          { ...exampleGameState.players[0], id: playerId, name: request.playerName },
          ...exampleGameState.players.slice(1),
        ],
        currentPlayerId: playerId,
        state: GameState.Preparing,
      };
      setGame(newGame);
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve({ game: newGame, playerId });
        }, 300)
      );
    },

    async joinGame(request: JoinGameRequest): Promise<CreateOrJoinGameResponse> {
      const playerId = `mock-player-${mockPlayerCounter++}`;
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            game: {
              id: mockGameId,
              players: [
                {
                  id: playerId,
                  name: request.playerName,
                  handCards: [],
                },
              ],
              state: GameState.Preparing,
              money: 0,
              resources: 0,
              currentPlayerId: '',
              board: {
                generationCards: [null, null, null],
                distributionCards: [null, null, null],
                storageCards: [null, null, null],
                climateActionCards: [],
                eventCards: [],
                catastropheCard: null,
              },
              phaseIndex: 0,
              turnInPhase: 0,
              turnsPerPhase: 0,
              phases: [],
              progressCardPileSize: 0,
              progressPoints: 0,
            },
            playerId: playerId,
          });
        }, 300)
      );
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async leaveGame(_request: LeaveGameRequest): Promise<boolean> {
      setGame(null);
      return new Promise((resolve) => setTimeout(() => resolve(true), 300));
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async startGame(_request: StartGameRequest): Promise<void> {
      setGame((prev) => (prev ? { ...prev, state: GameState.Running } : null));
      return new Promise((resolve) => setTimeout(() => resolve(), 300));
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async cancelGame(_req: CancelGameRequest): Promise<boolean> {
      setGame(null);
      return new Promise((resolve) => setTimeout(() => resolve(true), 300));
    },
  };
}
