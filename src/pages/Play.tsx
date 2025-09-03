import { useGame } from '../context/GameContext';
import { GameState } from '../types/Game';
import GamePage from './GamePage';
import JoinGame from './JoinGame';
import Lobby from './Lobby';

export default function Play() {
  const { game } = useGame();
  if (!game) {
    return <JoinGame />;
  }
  if (game.state === GameState.PREPARING) {
    return <Lobby />;
  }

  return <GamePage />;
}
