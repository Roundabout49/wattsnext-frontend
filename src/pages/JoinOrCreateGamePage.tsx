import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  SnackbarContent,
} from '@mui/material';
import { useSession } from '../context/SessionContext';
import { CreateOrJoinGameResponse, GameMode } from '../api/MessageTypes';
import { useGameApi } from '../context/GameApiContext';
import { useGame } from '../context/GameContext';
import { LabelWithInfo } from '../components/LabelWithInfo';

const JoinOrCreateGamePage: React.FC = () => {
  const [nicknameCreate, setNicknameCreate] = useState('');
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.StartWithCoal);

  const [nicknameJoin, setNicknameJoin] = useState('');
  const [shareCodeInput, setShareCodeInput] = useState('');
  const [showJoinError, setShowJoinError] = useState(false);

  const { setSession } = useSession();
  const { setGame } = useGame();
  const gameApi = useGameApi();

  const handleCreateGame = async () => {
    if (!nicknameCreate.trim()) return;
    try {
      const { game, playerId }: CreateOrJoinGameResponse = await gameApi.createGame({
        playerName: nicknameCreate,
        gameMode: gameMode,
      });
      setSession(game.id, playerId, game.players.find((p) => p.id === playerId)?.name || '?');
      setGame(game);
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinGame = async () => {
    if (!nicknameJoin.trim() || !shareCodeInput.trim()) return;
    try {
      const { game, playerId }: CreateOrJoinGameResponse = await gameApi.joinGame({
        playerName: nicknameJoin,
        shareCode: shareCodeInput,
      });
      setSession(game.id, playerId, game.players.find((p) => p.id === playerId)?.name || '?');
      setGame(game);
    } catch (err) {
      console.error(err);
      setShowJoinError(true);
      setShareCodeInput('');
    }
  };

  return (
    <>
      <Snackbar
        open={showJoinError}
        autoHideDuration={4000}
        onClose={() => setShowJoinError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <SnackbarContent
          message="Es existiert kein Spiel mit dieser ID."
          sx={{
            backgroundColor: 'error.main',
            color: 'white',
            fontWeight: 'bold',
          }}
        />
      </Snackbar>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        mt={4}
        px={2}
        gap={4}
        width="100%"
      >
        {/* ------------------ Create new game ------------------ */}
        <Paper elevation={3} sx={{ p: 4, width: 400 }}>
          <Stack spacing={3}>
            <Typography variant="h5" textAlign="center">
              Neues Spiel erstellen
            </Typography>

            <div>
              <LabelWithInfo
                label="Dein Spitzname"
                info="Dieser Name wird den Mitspielenden angezeigt."
              />
              <TextField
                placeholder="Spitzname"
                value={nicknameCreate}
                onChange={(e) => setNicknameCreate(e.target.value)}
                fullWidth
              />
            </div>

            <div>
              <LabelWithInfo
                label="Szenario"
                info="Wähle aus, ob das Spiel mit einem Kohlekraftwerk oder einem Atomkraftwerk startet."
              />

              <ToggleButtonGroup
                value={gameMode}
                exclusive
                fullWidth
                onChange={(_, value) => value && setGameMode(value)}
                sx={{
                  mt: 1,
                  '& .MuiToggleButton-root.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    borderColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              >
                <ToggleButton value={GameMode.StartWithCoal}>Kohleausstieg</ToggleButton>
                <ToggleButton value={GameMode.StartWithNuclear}>Atomkraftausstieg</ToggleButton>
              </ToggleButtonGroup>
            </div>

            <Button
              variant="contained"
              onClick={handleCreateGame}
              disabled={!nicknameCreate.trim()}
            >
              Spiel erstellen
            </Button>
          </Stack>
        </Paper>

        {/* ------------------ Join existing game ------------------ */}
        <Paper elevation={3} sx={{ p: 4, width: 400 }}>
          <Stack spacing={3}>
            <Typography variant="h5" textAlign="center">
              Bestehendem Spiel beitreten
            </Typography>

            <div>
              <LabelWithInfo
                label="Dein Spitzname"
                info="Dieser Name wird den Mitspielenden angezeigt."
              />
              <TextField
                placeholder="Spitzname"
                value={nicknameJoin}
                onChange={(e) => setNicknameJoin(e.target.value)}
                fullWidth
              />
            </div>

            <div>
              <LabelWithInfo
                label="Spiel-Code"
                info="Wenn bereits jemand ein Spiel erstellt hat, kann er oder sie dir den Spiel-Code schicken, damit du beitreten kannst."
              />
              <TextField
                placeholder="A7K2"
                value={shareCodeInput}
                onChange={(e) => setShareCodeInput(e.target.value)}
                fullWidth
              />
            </div>

            <Button
              variant="contained"
              onClick={handleJoinGame}
              disabled={!nicknameJoin.trim() || !shareCodeInput.trim()}
            >
              Spiel beitreten
            </Button>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default JoinOrCreateGamePage;
