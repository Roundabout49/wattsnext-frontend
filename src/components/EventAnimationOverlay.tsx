import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useEventAnimation } from '../context/EventAnimationContext';
import EventCardLarge from './cards/EventCardLarge';
import { EVENT_ENTER_MS, EVENT_EXIT_MS, EVENT_HOLD_MS } from '../animationTimings';

type Phase = 'enter' | 'hold' | 'exit';

const EventAnimationOverlay: React.FC = () => {
  const { activeEvent, dismiss } = useEventAnimation();
  const [phase, setPhase] = useState<Phase>('enter');

  useEffect(() => {
    if (!activeEvent) return;

    setPhase('enter');
    const toHold = window.setTimeout(() => setPhase('hold'), EVENT_ENTER_MS);
    const toExit = window.setTimeout(() => setPhase('exit'), EVENT_ENTER_MS + EVENT_HOLD_MS);
    const toDone = window.setTimeout(dismiss, EVENT_ENTER_MS + EVENT_HOLD_MS + EVENT_EXIT_MS);

    return () => {
      window.clearTimeout(toHold);
      window.clearTimeout(toExit);
      window.clearTimeout(toDone);
    };
  }, [activeEvent, dismiss]);

  if (!activeEvent) return null;

  const shown = phase === 'hold';
  const scale = phase === 'enter' ? 0.85 : phase === 'exit' ? 0.95 : 1;
  const duration = phase === 'exit' ? EVENT_EXIT_MS : EVENT_ENTER_MS;

  return (
    <Box
      onClick={dismiss}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `rgba(0, 0, 0, ${shown ? 0.6 : 0})`,
        transition: `background-color ${duration}ms ease`,
        pointerEvents: shown ? 'auto' : 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          transform: `scale(${scale})`,
          opacity: shown ? 1 : 0,
          transition: `transform ${duration}ms ease, opacity ${duration}ms ease`,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}
        >
          {activeEvent.card.isCatastrophe ? 'Katastrophe!' : 'Neues Ereignis'}
        </Typography>
        <EventCardLarge card={activeEvent.card} />
      </Box>
    </Box>
  );
};

export default EventAnimationOverlay;
