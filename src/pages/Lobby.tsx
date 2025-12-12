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

export default function Lobby() {
  const { game } = useGame();
  const { gameId, playerId, clearSession } = useSession();

  const gameApi = useGameApi();

  if (!game) {
    return <Typography>Kein Spiel gefunden.</Typography>;
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(game.id);
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
            Neues Spiel mit ID
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'monospace',
              bgcolor: 'grey.100',
              px: 1,
              borderRadius: 1,
            }}
          >
            {gameId}
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
                      color="secondary"
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
  );
}
