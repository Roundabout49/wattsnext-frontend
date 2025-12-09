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
  const [gameIdInput, setGameIdInput] = useState('');

  const { setSession } = useSession();
  const { setGame } = useGame();
  const gameApi = useGameApi();

  // TODO: Let user choose GameMode
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

  // TODO: What happens if game with gameId does not exist?
  const handleJoinGame = async () => {
    if (!nicknameJoin.trim() || !gameIdInput.trim()) return;
    try {
      const { game, playerId }: CreateOrJoinGameResponse = await gameApi.joinGame({
        playerName: nicknameJoin,
        gameId: gameIdInput,
      });
      setSession(game.id, playerId, game.players.find((p) => p.id === playerId)?.name || '?');
      setGame(game);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={4} px={2}>
      <Stack
        direction="row"
        spacing={4}
        flexWrap="wrap"
        width="100%"
        justifyContent="center"
        alignItems="flex-start"
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
                label="Spiel-ID"
                info="Wenn bereits jemand ein Spiel erstellt hat, kann er oder sie dir die Spiel-ID schicken, damit du beitreten kannst."
              />
              <TextField
                placeholder="12345678-abcd-1234-5678-abcdef123456"
                value={gameIdInput}
                onChange={(e) => setGameIdInput(e.target.value)}
                fullWidth
              />
            </div>

            <Button
              variant="contained"
              onClick={handleJoinGame}
              disabled={!nicknameJoin.trim() || !gameIdInput.trim()}
            >
              Spiel beitreten
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default JoinOrCreateGamePage;
