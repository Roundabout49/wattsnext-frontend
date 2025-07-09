import { Box, Typography } from '@mui/material';

type DieProps = {
  playerName: string;
  result: number | null;
  step: 'rolling' | 'showResult';
};

const Die: React.FC<DieProps> = ({ playerName, result, step }) => {
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
      {/* hier kann später ein animierter Würfel sein */}
      <Box sx={{ mt: 3 }}>{step === 'showResult' ? `Ergebnis: ${result}` : '🎲'}</Box>
    </Box>
  );
};

export default Die;
