// TODO: Refactor (extract types)

const BASE_URL = 'http://localhost:8080/game-management';

export type CreateGameRequest = { playerName: string };
export type JoinGameRequest = { gameId: string; playerName: string };
export type PlayerDto = { id: string; name: string };

export async function createGame(req: CreateGameRequest): Promise<PlayerDto & { gameId: string }> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to create game');
  return res.json();
}

export async function joinGame(req: JoinGameRequest): Promise<PlayerDto> {
  const res = await fetch(`${BASE_URL}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to join game');
  return res.json();
}

export async function startGame(gameId: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId }),
  });
  if (!res.ok) throw new Error('Failed to start game');
}
