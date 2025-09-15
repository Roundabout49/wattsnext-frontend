import { Player } from '../types/Game';
import {
  CreateGameRequest,
  CreateGameResponse,
  JoinGameRequest,
  StartGameRequest,
} from './MessageTypes';

const BASE_URL = 'http://localhost:8080/game-management';

export async function createGame(req: CreateGameRequest): Promise<CreateGameResponse> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to create game');
  return res.json();
}

// Player without handcards
export async function joinGame(req: JoinGameRequest): Promise<Player> {
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
    body: JSON.stringify({ req }),
  });
  if (!res.ok) throw new Error('Failed to start game');
}
