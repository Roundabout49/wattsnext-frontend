import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type DieProps = {
  playerName: string;
  result: number | null;
  step: 'rolling' | 'showResult';
};

// Positionen der Punkte pro Augenzahl
const dotPatterns: Record<number, boolean[][]> = {
  1: [
    [false, false, false],
    [false, true, false],
    [false, false, false],
  ],
  2: [
    [true, false, false],
    [false, false, false],
    [false, false, true],
  ],
  3: [
    [true, false, false],
    [false, true, false],
    [false, false, true],
  ],
  4: [
    [true, false, true],
    [false, false, false],
    [true, false, true],
  ],
  5: [
    [true, false, true],
    [false, true, false],
    [true, false, true],
  ],
  6: [
    [true, false, true],
    [true, false, true],
    [true, false, true],
  ],
};

const Die: React.FC<DieProps> = ({ playerName, result, step }) => {
  const [rollingNumber, setRollingNumber] = useState<number>(1);

  useEffect(() => {
    let interval: number;

    if (step === 'rolling') {
      interval = setInterval(() => {
        setRollingNumber(Math.floor(Math.random() * 6) + 1);
      }, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [step]);

  const displayedNumber = step === 'showResult' && result !== null ? result : rollingNumber;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <Typography variant="h5">{playerName} möchte Geld verdienen</Typography>

      <Box
        sx={{
          mt: 4,
          width: 100,
          height: 100,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: '6px',
          padding: '10px',
        }}
      >
        {dotPatterns[displayedNumber].flat().map((show, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {show && (
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#000',
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Die;
