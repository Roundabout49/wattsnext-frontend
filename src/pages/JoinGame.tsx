// src/pages/JoinOrCreateGamePage.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';

const JoinOrCreateGamePage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [gameIdInput, setGameIdInput] = useState('');

  const handleCreateGame = () => {
    if (!nickname.trim()) return;
    // TODO: Backend-Call zum Erstellen eines Spiels → gameId zurückbekommen
    // (`/lobby/${newGameId}`, { state: { nickname } });
  };

  const handleJoinGame = () => {
    if (!nickname.trim() || !gameIdInput.trim()) return;
    // TODO: Backend-Call zum Beitreten
    // navigate(`/lobby/${gameIdInput}`, { state: { nickname } });
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
