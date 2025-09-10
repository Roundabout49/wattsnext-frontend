// src/pages/JoinOrCreateGamePage.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { useSession } from '../context/SessionContext';
import { CreateGameResponse, GameMode } from '../api/MessageTypes';
import { createGame, joinGame } from '../api/gameApi';
import { Player } from '../types/Game';

const JoinOrCreateGamePage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [gameIdInput, setGameIdInput] = useState('');
  const { setSession } = useSession();

  // TODO: Let user choose GameMode
  const handleCreateGame = async () => {
    if (!nickname.trim()) return;
    try {
      const response: CreateGameResponse = await createGame({
        playerName: nickname,
        gameMode: GameMode.START_WITH_COAL,
      });
      setSession(response.gameId, response.player.id, response.player.name);
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: What happens if game with gameId does not exist?
  const handleJoinGame = async () => {
    if (!nickname.trim() || !gameIdInput.trim()) return;
    try {
      const response: Player = await joinGame({ playerName: nickname, gameId: gameIdInput });
      setSession(gameIdInput, response.id, response.name);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', m: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h4" textAlign="center">
            Spiel beitreten oder erstellen
          </Typography>

          <TextField
            label="Dein Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateGame}
            disabled={!nickname.trim()}
          >
            Neues Spiel erstellen
          </Button>

          <Typography variant="subtitle1" textAlign="center">
            oder bestehendem Spiel beitreten
          </Typography>

          <TextField
            label="Spiel-ID"
            value={gameIdInput}
            onChange={(e) => setGameIdInput(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleJoinGame}
            disabled={!nickname.trim() || !gameIdInput.trim()}
          >
            Beitreten
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default JoinOrCreateGamePage;
