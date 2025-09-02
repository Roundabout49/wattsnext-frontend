import { Box, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import PriceIcon from './icons/PriceIcon';
import ResourcesIcon from './icons/ResourcesIcon';
import EnergyIcon from './icons/EnergyIcon';
import PointsIcon from './icons/PointsIcon';
import PhaseObjectives from './PhaseObjective';
import { orderedTechnologyTypes } from '../types/TechnologyTypes';
import { orderedEnergyForms } from '../types/EnergyForms';
import { TechnologyEnergyMatrix } from '../types/Game';

const Status = () => {
  const { game } = useGame();
  const {
    phaseIndex: phase,
    turnInPhase: turn,
    turnsPerPhase: turnsInPhase,
    phases,
    money,
    resources,
    /*technologySizes,*/
  } = game;

  // TODO: Remove when technologySizes is implemented again
  const technologySizes: TechnologyEnergyMatrix = {
    Generation: { Electricity: 4, Heat: 2 },
    Distribution: { Electricity: 2, Heat: 0 },
    Storage: { Electricity: 1, Heat: 3 },
  };

  const progressPoints = phases[phase].progressPoints.value;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 550,
        backgroundColor: 'lightgrey',
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6" fontSize="1.1rem">
        Phase {phase + 1}, Zug {turn + 1}/{turnsInPhase}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Box sx={{ transform: 'scale(1.2)', transformOrigin: 'left' }}>
          <PointsIcon points={progressPoints} color="green" />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <PriceIcon price={money} />
        <ResourcesIcon resources={resources} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {orderedTechnologyTypes.map((technologyType) => (
          <Box
            key={technologyType}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {orderedEnergyForms.map((energyType) => (
              <Box
                sx={{
                  transform: 'scale(0.8)',
                }}
                key={`${technologyType}-${energyType}`}
              >
                <EnergyIcon
                  technology={technologyType}
                  form={energyType}
                  size={technologySizes[technologyType][energyType]}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <PhaseObjectives />
    </Box>
  );
};

export default Status;
