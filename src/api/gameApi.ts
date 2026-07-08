import {
  CancelGameRequest,
  CreateGameRequest,
  CreateOrJoinGameResponse,
  JoinGameRequest,
  LeaveGameRequest,
  StartGameRequest,
} from './MessageTypes';
import { API_BASE_URL } from '../base';

const BASE_URL = `${API_BASE_URL}/game-init`;

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

export async function leaveGame(req: LeaveGameRequest): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/leave`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to leave game');
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

export async function cancelGame(req: CancelGameRequest): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/cancel`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to cancel game');
  return res.json();
}

export async function fetchGameState(gameId: string) {
  const res = await fetch(`${BASE_URL}/${gameId}`);
  if (!res.ok) throw new Error('Failed to fetch game state');
  return res.json();
}
