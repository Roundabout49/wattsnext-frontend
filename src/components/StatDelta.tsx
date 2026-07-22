import { Box, Typography } from '@mui/material';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { STAT_FLOAT_MS, STAT_PULSE_MS } from '../animationTimings';

interface FloatItem {
  id: number;
  delta: number;
}

// Wraps a stat icon and, whenever `value` changes, pulses it and floats a green
// "+N" / red "−N" above it to draw the eye to the change.
const StatDelta: React.FC<{ value: number; children: ReactNode }> = ({ value, children }) => {
  const prevRef = useRef(value);
  const [floats, setFloats] = useState<FloatItem[]>([]);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const delta = value - prevRef.current;
    prevRef.current = value;
    if (delta === 0) return;

    const id = Date.now() + Math.random();
    setFloats((current) => [...current, { id, delta }]);
    setPulsing(true);

    const pulseTimer = window.setTimeout(() => setPulsing(false), STAT_PULSE_MS);
    // Each float removes itself; not cleared on re-run so rapid changes keep theirs.
    window.setTimeout(() => setFloats((current) => current.filter((f) => f.id !== id)), STAT_FLOAT_MS);
    return () => window.clearTimeout(pulseTimer);
  }, [value]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        transform: pulsing ? 'scale(1.35)' : 'scale(1)',
        transition: `transform ${STAT_PULSE_MS}ms ease`,
      }}
    >
      {children}
      {floats.map((f) => (
        <Typography
          key={f.id}
          sx={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            color: f.delta > 0 ? '#2e7d32' : '#d32f2f',
            animation: `${STAT_FLOAT_MS}ms ease-out forwards floatUp`,
            '@keyframes floatUp': {
              from: { opacity: 1, transform: 'translate(-50%, 4px)' },
              to: { opacity: 0, transform: 'translate(-50%, -16px)' },
            },
          }}
        >
          {f.delta > 0 ? `+${f.delta}` : f.delta}
        </Typography>
      ))}
    </Box>
  );
};

export default StatDelta;
