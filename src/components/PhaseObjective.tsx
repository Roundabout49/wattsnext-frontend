import { Box, IconButton, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import PointsIcon from './icons/PointsIcon';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { orderedTechnologyTypes, TechnologyType } from '../types/TechnologyTypes';
import EnergyIcon from './icons/EnergyIcon';
import { EnergyForm, EnergyForms } from '../types/EnergyForms';
import { PhaseObjective } from '../types/Game';

const PhaseObjectives = () => {
  const { game: gameState } = useGame();
  const { phaseIndex: currentPhaseIndex, phases } = gameState!;

  const [visiblePhaseIndex, setVisiblePhaseIndex] = useState(currentPhaseIndex);

  const handlePrev = () => {
    if (visiblePhaseIndex > 0) {
      setVisiblePhaseIndex(visiblePhaseIndex - 1);
    }
  };

  const handleNext = () => {
    if (visiblePhaseIndex < phases.length - 1) {
      setVisiblePhaseIndex(visiblePhaseIndex + 1);
    }
  };

  const objective = phases[visiblePhaseIndex];

  const phaseObjectiveKeyMap: Record<TechnologyType | EnergyForm, keyof PhaseObjective> = {
    Generation: 'generation',
    Distribution: 'distribution',
    Storage: 'storage',
    Electricity: 'electricity',
    Heat: 'heat',
  };

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
        <IconButton onClick={handlePrev} disabled={visiblePhaseIndex === 0}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Typography
          variant="h6"
          fontSize="1.1rem"
          sx={{
            fontWeight: 'bold',
            color: visiblePhaseIndex === currentPhaseIndex ? 'black' : 'grey',
          }}
        >
          Phase {visiblePhaseIndex + 1}
        </Typography>

        <IconButton onClick={handleNext} disabled={visiblePhaseIndex === phases.length - 1}>
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
        {visiblePhaseIndex === currentPhaseIndex && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PointsIcon points={objective.progressPoints.value} color="green" />
            <Typography variant="h3" fontSize="1.8rem" sx={{ userSelect: 'none' }}>
              /
            </Typography>
          </Box>
        )}
        <PointsIcon points={objective.progressPoints.target} color="green" />
      </Box>
      {orderedTechnologyTypes.map((technologyType) => {
        const key = phaseObjectiveKeyMap[technologyType];
        return (
          <Box sx={{ transform: 'scale(0.7)' }} key={technologyType}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
              {visiblePhaseIndex === currentPhaseIndex && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <EnergyIcon technology={technologyType} size={objective[key].value} />
                  <Typography
                    variant="h3"
                    fontSize="2.5rem"
                    sx={{ userSelect: 'none', position: 'relative', top: '0.25rem' }}
                  >
                    /
                  </Typography>
                </Box>
              )}
              <EnergyIcon technology={technologyType} size={objective[key].target} />
            </Box>
          </Box>
        );
      })}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
        {(Object.keys(EnergyForms) as EnergyForm[]).map((energyType) => {
          const IconComponent = EnergyForms[energyType].icon;
          const key = phaseObjectiveKeyMap[energyType];
          const { value, target } = objective[key];

          const isFulfilled = value >= target;

          return (
            <Box sx={{ transform: 'scale(1.5)' }} key={energyType}>
              <IconComponent color={isFulfilled ? 'inherit' : 'disabled'} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PhaseObjectives;
