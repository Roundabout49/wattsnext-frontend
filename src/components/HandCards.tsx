import { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Paper, Typography, IconButton, Collapse, Button } from '@mui/material';
import ProgressCardSmall from './cards/ProgressCardSmall';
import { useCardAnimation } from '../context/CardAnimationContext';

const HandCards = () => {
  const { gameState } = useGame();
  const { players } = gameState;

  const { registerCardRef, getCardRef, startCardAnimation: startAnimation } = useCardAnimation();

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
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">{player.name}</Typography>
              <IconButton onClick={() => toggleOpen(player.name)}>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            <Collapse in={isOpen}>
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {player.hand.map((card) => {
                  const cardRef = useRef<HTMLDivElement>(null);

                  useEffect(() => {
                    registerCardRef(card.title, cardRef);
                  }, [card.title]);
                  return (
                    <div ref={cardRef} key={card.title}>
                      <ProgressCardSmall card={card} />
                    </div>
                  );
                })}
              </Box>
            </Collapse>
            <Button
              variant="contained"
              onClick={() => {
                const fromRef = getCardRef(player.hand[0].title);
                const toRef = getCardRef('generation-2');

                if (fromRef?.current && toRef?.current) {
                  startAnimation(
                    player.hand[0].title,
                    'generation-2',
                    <ProgressCardSmall card={player.hand[0]} />,
                    () => {
                      console.log('Animation abgeschlossen');
                    }
                  );
                } else {
                  console.log('Karte oder Ziel nicht gefunden.');
                }
              }}
            >
              Animation Hand → Platz
            </Button>
          </Paper>
        );
      })}
    </Box>
  );
};

export default HandCards;
