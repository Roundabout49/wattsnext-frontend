import { Box, CircularProgress } from '@mui/material';
import { useGame } from '../context/GameContext';
import { GameState } from '../types/Game';
import GamePage from './GamePage';
import JoinOrCreateGamePage from './JoinOrCreateGamePage';
import Lobby from './Lobby';

export default function Play() {
  const { game, loading } = useGame();
  if (loading) {
    return (
      <Box
        sx={{
          height: '100%',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!game) {
    return <JoinOrCreateGamePage />;
  }
  if (game.state === GameState.Preparing) {
    return <Lobby />;
  }

  return <GamePage />;
}
