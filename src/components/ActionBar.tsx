import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useGame } from '../context/GameContext';

const ActionBar = () => {
  const { gameState } = useGame();
  const { currentPlayerName } = gameState;
  const [playerName, setPlayerName] = useState<string | null>(null);

  useEffect(() => {
    // Den Namen aus localStorage laden, wenn er existiert
    const storedName = localStorage.getItem('playerName');
    if (storedName) {
      setPlayerName(storedName);
    }
  }, []);

  const isCurrentPlayer = currentPlayerName === playerName;

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'lightgrey',
        padding: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: 2,
      }}
    >
      {currentPlayerName
        ? isCurrentPlayer
          ? 'Du bist am Zug'
          : `${currentPlayerName} ist am Zug`
        : 'Kein Spielername'}
    </Box>
  );
};

export default ActionBar;
