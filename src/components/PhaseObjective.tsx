import { Box, IconButton, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import PointsIcon from './PointsIcon';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { orderedTechnologyTypes } from '../types/TechnologyTypes';
import EnergyIcon from './EnergyIcon';
import { EnergyTypes } from '../types/EnergyTypes';

const PhaseObjective = () => {
  const { gameState } = useGame();
  const { phase: currentPhase, phaseObjectives, progressPoints, technologySizes } = gameState;

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        height: 250,
        width: '100%',
        background: 'white',
      }}
    >
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
          fontSize="1.2rem"
          sx={{
            fontWeight: 'bold',
            color: visiblePhase === currentPhase ? 'black' : 'grey',
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 0.5,
          ml: '7px',
          mb: 1,
        }}
      >
        {visiblePhase === currentPhase && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PointsIcon points={progressPoints} color="green" />
            <Typography variant="h3" fontSize="1.8rem" sx={{ userSelect: 'none' }}>
              /
            </Typography>
          </Box>
        )}
        <PointsIcon points={objective.progressPoints} color="green" />
      </Box>
      {orderedTechnologyTypes.map((technologyType) => (
        <Box sx={{ transform: 'scale(0.7)' }} key={technologyType}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
            {visiblePhase === currentPhase && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <EnergyIcon
                  technology={technologyType}
                  size={Object.values(technologySizes[technologyType]).reduce(
                    (sum, size) => sum + size,
                    0
                  )}
                />
                <Typography
                  variant="h3"
                  fontSize="2.5rem"
                  sx={{ userSelect: 'none', position: 'relative', top: '0.25rem' }}
                >
                  /
                </Typography>
              </Box>
            )}
            <EnergyIcon
              technology={technologyType}
              size={objective.technologyTypes[technologyType]}
            />
          </Box>
        </Box>
      ))}

      {/*TODO: Color should only depend on fulfillment in current (maybe also past) phases*/}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
        {objective.energyTypes.map((energyType) => {
          const IconComponent = EnergyTypes[energyType].icon;
          const fulfilledObjective = Object.values(technologySizes).some(
            (energyMap) => energyMap[energyType] > 0
          );
          return (
            <Box sx={{ transform: 'scale(1.5)' }} key={energyType}>
              <IconComponent color={fulfilledObjective ? 'inherit' : 'disabled'} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PhaseObjective;
