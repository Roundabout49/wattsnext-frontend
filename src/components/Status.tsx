import { Box, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import PriceIcon from './icons/PriceIcon';
import ResourcesIcon from './icons/ResourcesIcon';
import EnergyIcon from './icons/EnergyIcon';
import PointsIcon from './icons/PointsIcon';
import PhaseObjective from './PhaseObjective';
import { orderedTechnologyTypes } from '../types/TechnologyTypes';
import { orderedEnergyTypes } from '../types/EnergyTypes';

const Status = () => {
  const { gameState } = useGame();
  const { phase, turn, turnsInPhase, progressPoints, money, resources, technologySizes } =
    gameState;

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
      <Typography variant="h6" fontSize="1.2rem">
        Phase {phase}, Zug {turn}/{turnsInPhase}
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
            {orderedEnergyTypes.map((energyType) => (
              <Box
                sx={{
                  transform: 'scale(0.8)',
                }}
                key={`${technologyType}-${energyType}`}
              >
                <EnergyIcon
                  technology={technologyType}
                  energy={energyType}
                  size={technologySizes[technologyType][energyType]}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <PhaseObjective />
    </Box>
  );
};

export default Status;
