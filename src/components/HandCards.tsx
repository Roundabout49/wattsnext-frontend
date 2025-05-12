import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Paper, Typography, IconButton, Collapse } from '@mui/material';
import ProgressCardSmall from './cards/ProgressCardSmall';

const HandCards = () => {
  const { gameState } = useGame();
  const { players } = gameState;

  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const toggleOpen = (playerName: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [playerName]: !prev[playerName],
    }));
  };

  // TODO: Closing currently needs 2 clicks ...
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {players.map((player) => {
        const isOpen = openStates[player.name] ?? true;

        return (
          <Paper key={player.name} variant="outlined" sx={{ p: 1 }}>
            {/* Header mit Name und Toggle */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">{player.name}</Typography>
              <IconButton onClick={() => toggleOpen(player.name)}>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            {/* Handkarten ein-/ausklappbar */}
            <Collapse in={isOpen}>
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {player.hand.map((card, idx) => (
                  <ProgressCardSmall key={idx} card={card} />
                ))}
              </Box>
            </Collapse>
          </Paper>
        );
      })}
    </Box>
  );
};

export default HandCards;
