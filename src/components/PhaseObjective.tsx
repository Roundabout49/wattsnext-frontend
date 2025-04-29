import { Box, IconButton, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import PointsIcon from './PointsIcon';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PhaseObjective = () => {
  const { gameState } = useGame();
  const { phase: currentPhase, phaseObjectives } = gameState;

  const sortedPhases = Object.keys(phaseObjectives)
    .map(Number)
    .sort((a, b) => a - b);

  const [visiblePhase, setVisiblePhase] = useState(currentPhase);

  const handlePrev = () => {
    const currentIndex = sortedPhases.indexOf(visiblePhase);
    if (currentIndex > 0) {
      setVisiblePhase(sortedPhases[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = sortedPhases.indexOf(visiblePhase);
    if (currentIndex < sortedPhases.length - 1) {
      setVisiblePhase(sortedPhases[currentIndex + 1]);
    }
  };

  const objective = phaseObjectives[visiblePhase]?.objective;

  return (
    <Box
      sx={{
        height: 200,
        width: '100%',
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <IconButton onClick={handlePrev} disabled={visiblePhase === sortedPhases[0]}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: visiblePhase === currentPhase ? 'red' : 'black',
            }}
          >
            Phase {visiblePhase}
          </Typography>

          <IconButton
            onClick={handleNext}
            disabled={visiblePhase === sortedPhases[sortedPhases.length - 1]}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <PointsIcon points={objective.progressPoints} color="green" />
      </Box>
    </Box>
  );
};

export default PhaseObjective;
