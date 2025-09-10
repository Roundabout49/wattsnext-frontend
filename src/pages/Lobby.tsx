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

export default function Lobby() {
  const { game } = useGame();
  const { playerId } = useSession();

  if (!game) {
    return <Typography>Kein Spiel gefunden.</Typography>;
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(game.id);
  };

  const handleStartGame = () => {
    // TODO: Backend call to start game
  };

  const handleLeaveGame = () => {
    // TODO: Backend call to leave game
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
          width: 'fit-content', // Breite richtet sich nach Inhalt
          minWidth: 300, // etwas Mindestbreite für Lesbarkeit
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
            {game.id}
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
