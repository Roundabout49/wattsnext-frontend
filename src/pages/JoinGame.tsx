// src/pages/JoinOrCreateGamePage.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { useSession } from '../context/SessionContext';
import { CreateOrJoinGameResponse, GameMode } from '../api/MessageTypes';
import { useGameApi } from '../context/GameApiContext';
import { useGame } from '../context/GameContext';

const JoinOrCreateGamePage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [gameIdInput, setGameIdInput] = useState('');
  const { setSession } = useSession();
  const { setGame } = useGame();

  const gameApi = useGameApi();

  // TODO: Let user choose GameMode
  const handleCreateGame = async () => {
    if (!nickname.trim()) return;
    try {
      const { game, playerId }: CreateOrJoinGameResponse = await gameApi.createGame({
        playerName: nickname,
        gameMode: GameMode.StartWithCoal,
      });
      setSession(game.id, playerId, game.players.find((p) => p.id === playerId)?.name || '?');
      setGame(game);
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: What happens if game with gameId does not exist?
  const handleJoinGame = async () => {
    if (!nickname.trim() || !gameIdInput.trim()) return;
    try {
      const { game, playerId }: CreateOrJoinGameResponse = await gameApi.joinGame({
        playerName: nickname,
        gameId: gameIdInput,
      });
      setSession(game.id, playerId, game.players.find((p) => p.id === playerId)?.name || '?');
      setGame(game);
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
