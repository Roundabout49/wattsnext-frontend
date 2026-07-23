import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { GameState } from '../types/Game';

// Win/lose screen, shown once the final evaluation table has closed so every
// client reveals it at the same time.
const GameEndOverlay: React.FC = () => {
  const { game, phaseCompleted } = useGame();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  const isWon = game?.state === GameState.Won;
  const active = (isWon || game?.state === GameState.Lost) && !phaseCompleted && !dismissed;

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [active]);

  if (!active) return null;

  // A game lost with negative money ended because a mandatory payment (e.g. an event card)
  // could not be covered — communicate that explicitly, it differs from missing the targets.
  const isBankrupt = !isWon && (game?.money ?? 0) < 0;

  const look = isWon
    ? {
        bg: 'rgba(20, 83, 45, 0.94)',
        emoji: '🎉',
        title: 'Gewonnen!',
        text: 'Ihr habt die Energiewende geschafft!',
      }
    : isBankrupt
      ? {
          bg: 'rgba(90, 22, 22, 0.94)',
          emoji: '😢',
          title: 'Verloren',
          text: 'Das Geld hat nicht gereicht, um eine fällige Zahlung zu leisten.',
        }
      : {
          bg: 'rgba(90, 22, 22, 0.94)',
          emoji: '😢',
          title: 'Verloren',
          text: 'Die Energiewende ist diesmal nicht gelungen.',
        };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        px: 2,
        textAlign: 'center',
        color: 'white',
        backgroundColor: look.bg,
        opacity: visible ? 1 : 0,
        transition: 'opacity 500ms ease',
      }}
    >
      <Typography sx={{ fontSize: '5rem', lineHeight: 1 }}>{look.emoji}</Typography>
      <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
        {look.title}
      </Typography>
      <Typography variant="h6" sx={{ maxWidth: 480 }}>
        {look.text}
      </Typography>
      <Button
        variant="contained"
        onClick={() => setDismissed(true)}
        sx={{
          backgroundColor: 'white',
          color: look.bg,
          fontWeight: 'bold',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.85)' },
        }}
      >
        Ergebnis ansehen
      </Button>
    </Box>
  );
};

export default GameEndOverlay;
