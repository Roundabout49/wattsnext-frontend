import { useGame } from '../context/GameContext';
import {
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSession } from '../context/SessionContext';
import { useGameApi } from '../context/GameApiContext';
import { boardColors } from '../themes';
import EnergyLandscape from '../components/EnergyLandscape';

export default function Lobby() {
  const { game } = useGame();
  const { gameId, playerId, clearSession } = useSession();

  const gameApi = useGameApi();

  if (!game) {
    return <Typography>Kein Spiel gefunden.</Typography>;
  }

  const handleCopyId = () => {
    if (game.shareCode) navigator.clipboard.writeText(game.shareCode);
  };

  const handleStartGame = () => {
    if (!gameId) return;
    try {
      gameApi.startGame({ gameId });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeaveGame = async () => {
    if (!gameId || !playerId) return;
    try {
      const leftSuccessfully = await gameApi.leaveGame({ gameId, playerId });
      if (leftSuccessfully) {
        clearSession();
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
        }}
      >
      <Paper
        sx={{
          p: 3,
          width: 'fit-content',
          minWidth: 300,
          textAlign: 'left',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ mr: 1 }}>
            Neues Spiel mit Code
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'monospace',
              bgcolor: boardColors.skyLight,
              px: 1,
              borderRadius: 1,
            }}
          >
            {game.shareCode}
          </Typography>
          <IconButton onClick={handleCopyId} size="small" sx={{ ml: 1 }}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="subtitle1">Spieler:</Typography>
        <List>
          {game.players.map((player) => {
            const isSelf = player.id === playerId;
            return (
              <ListItem
                key={player.id}
                secondaryAction={
                  isSelf && (
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => handleLeaveGame()}
                    >
                      Verlassen
                    </Button>
                  )
                }
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: isSelf ? 'bold' : 'normal',
                      }}
                    >
                      {player.name} {isSelf && '(du)'}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleStartGame}>
            Spiel starten
          </Button>
        </Box>
      </Paper>
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <EnergyLandscape variant="minimal" />
      </Box>
    </Box>
  );
}
