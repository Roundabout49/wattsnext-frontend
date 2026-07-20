import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useEventAnimation } from '../context/EventAnimationContext';
import { useCardAnimation } from '../context/CardAnimationContext';
import EventCardLarge from './cards/EventCardLarge';
import { EVENT_ENTER_MS, EVENT_EXIT_MS, EVENT_FLY_MS, EVENT_HOLD_MS } from '../animationTimings';

type Phase = 'enter' | 'hold' | 'fly' | 'exit';

// Where the card flies to: measured from the on-screen card (`from`) and its
// board slot (`to`).
interface Geometry {
  from: DOMRect;
  to: DOMRect;
}

const EventAnimationOverlay: React.FC = () => {
  const { activeEvent, dismiss, releaseEffects } = useEventAnimation();
  const { getCardRef } = useCardAnimation();
  const [phase, setPhase] = useState<Phase>('enter');
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeEvent) return;

    setPhase('enter');
    setGeometry(null);
    const timers: number[] = [];

    timers.push(window.setTimeout(() => setPhase('hold'), EVENT_ENTER_MS));
    timers.push(
      window.setTimeout(() => {
        // The effects count up in the status display as the card leaves the centre.
        releaseEffects();
        const slot = getCardRef(activeEvent.slotDomId);
        const from = cardRef.current?.getBoundingClientRect();
        if (slot && from) {
          setGeometry({ from, to: slot.getBoundingClientRect() });
          setPhase('fly');
          timers.push(window.setTimeout(dismiss, EVENT_FLY_MS));
        } else {
          // No slot to fly to: just fade out.
          setPhase('exit');
          timers.push(window.setTimeout(dismiss, EVENT_EXIT_MS));
        }
      }, EVENT_ENTER_MS + EVENT_HOLD_MS)
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [activeEvent, dismiss, getCardRef, releaseEffects]);

  if (!activeEvent) return null;

  const shown = phase === 'hold';
  const duration = phase === 'fly' ? EVENT_FLY_MS : phase === 'exit' ? EVENT_EXIT_MS : EVENT_ENTER_MS;

  let cardTransform = 'scale(1)';
  let cardOrigin = 'center';
  let cardOpacity = 1;

  if (phase === 'enter') {
    cardTransform = 'scale(0.85)';
    cardOpacity = 0;
  } else if (phase === 'fly' && geometry) {
    const dx = geometry.to.left - geometry.from.left;
    const dy = geometry.to.top - geometry.from.top;
    const scale = geometry.to.width / geometry.from.width;
    cardTransform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    cardOrigin = 'top left';
  } else if (phase === 'exit') {
    cardTransform = 'scale(0.95)';
    cardOpacity = 0;
  }

  return (
    <Box
      onClick={shown ? dismiss : undefined}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        backgroundColor: `rgba(0, 0, 0, ${shown ? 0.6 : 0})`,
        transition: `background-color ${duration}ms ease`,
        pointerEvents: shown ? 'auto' : 'none',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
          opacity: shown ? 1 : 0,
          transition: `opacity ${duration}ms ease`,
        }}
      >
        {activeEvent.card.isCatastrophe ? 'Katastrophe!' : 'Neues Ereignis'}
      </Typography>
      <Box
        ref={cardRef}
        sx={{
          transformOrigin: cardOrigin,
          transform: cardTransform,
          opacity: cardOpacity,
          transition: `transform ${duration}ms ease, opacity ${duration}ms ease`,
        }}
      >
        <EventCardLarge card={activeEvent.card} />
      </Box>
    </Box>
  );
};

export default EventAnimationOverlay;
