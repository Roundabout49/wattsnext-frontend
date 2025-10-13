import { CircularProgress } from '@mui/material';
import { useGame } from '../context/GameContext';
import { GameState } from '../types/Game';
import GamePage from './GamePage';
import JoinGame from './JoinGame';
import Lobby from './Lobby';

export default function Play() {
  const { game, loading } = useGame();
  if (loading) {
    // TODO: Doesn't show up?
    <CircularProgress />;
  }
  if (!game) {
    return <JoinGame />;
  }
  if (game.state === GameState.Preparing) {
    return <Lobby />;
  }

  return <GamePage />;
}
