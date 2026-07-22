import { Box, IconButton, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import PointsIcon from './icons/PointsIcon';
import { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { orderedTechnologyTypes, TechnologyType } from '../types/TechnologyTypes';
import EnergyIcon from './icons/EnergyIcon';
import { EnergyForm, EnergyForms } from '../types/EnergyForms';
import { PhaseObjective } from '../types/Game';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import { sumEventEffect, useEventAnimation } from '../context/EventAnimationContext';

// currentPhaseIndex is the phase shown in the status header; it lags the real
// game phase while an action is resolving, so the objective view switches at the
// same moment as the "Phase X, Zug Y" line above.
const PhaseObjectives = ({ currentPhaseIndex }: { currentPhaseIndex: number }) => {
  const { game: gameState } = useGame();
  const { phases } = gameState!;

  const [visiblePhaseIndex, setVisiblePhaseIndex] = useState(currentPhaseIndex);

  // Jump to the new phase on a phase change, while still allowing manual navigation.
  useEffect(() => {
    setVisiblePhaseIndex(currentPhaseIndex);
  }, [currentPhaseIndex]);

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

  // Generation and distribution targets animate when an event changes them, and
  // hold the event's delta until the card flies (like the money/resource counters).
  // They are always computed from the current phase so navigating phases doesn't
  // trigger a count.
  const currentObjective = phases[currentPhaseIndex];
  const { activeEvent, effectsReleased } = useEventAnimation();
  const heldEffects = activeEvent && !effectsReleased ? activeEvent.effects : [];
  const targetDelta = sumEventEffect(heldEffects, 'GenerationAndDistributionTargets');
  const animatedTargets: Record<TechnologyType, number> = {
    Generation: useAnimatedNumber(currentObjective.generation.target - targetDelta).value,
    Distribution: useAnimatedNumber(currentObjective.distribution.target - targetDelta).value,
    Storage: useAnimatedNumber(currentObjective.storage.target).value,
  };

  const isCurrentPhase = visiblePhaseIndex === currentPhaseIndex;
  // Animate only while an event is changing the targets; navigating phases and
  // phase changes both jump.
  const targetValueFor = (technologyType: TechnologyType, key: keyof PhaseObjective): number =>
    isCurrentPhase && activeEvent ? animatedTargets[technologyType] : objective[key].target;

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
            <PointsIcon points={objective.progressPoints.value} leafColor="green" />
            <Typography variant="h3" fontSize="1.8rem" sx={{ userSelect: 'none' }}>
              /
            </Typography>
          </Box>
        )}
        <PointsIcon points={objective.progressPoints.target} leafColor="green" />
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
              <EnergyIcon technology={technologyType} size={targetValueFor(technologyType, key)} />
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
