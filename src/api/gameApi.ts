import {
  CreateGameRequest,
  CreateOrJoinGameResponse,
  JoinGameRequest,
  StartGameRequest,
} from './MessageTypes';

const BASE_URL = 'http://localhost:8080/game-init';

export async function createGame(req: CreateGameRequest): Promise<CreateOrJoinGameResponse> {
  const res = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to create game');
  return res.json();
}

export async function joinGame(req: JoinGameRequest): Promise<CreateOrJoinGameResponse> {
  const res = await fetch(`${BASE_URL}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to join game');
  return res.json();
}

export async function startGame(req: StartGameRequest): Promise<void> {
  const res = await fetch(`${BASE_URL}/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to start game');
}

export async function fetchGameState(gameId: string) {
  const res = await fetch(`${BASE_URL}/${gameId}`);
  if (!res.ok) throw new Error('Failed to fetch game state');
  return res.json();
}
