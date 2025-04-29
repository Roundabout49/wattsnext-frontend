import { Box, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import PriceIcon from './PriceIcon';
import ResourcesIcon from './ResourcesIcon';
import EnergyIcon from './EnergyIcon';
import { EnergyCharacteristics } from '../types/EnergyCharacteristics';
import PointsIcon from './PointsIcon';
import React from 'react';
import PhaseObjective from './PhaseObjective';
import { TechnologyType } from '../types/TechnologyTypes';
import { EnergyType } from '../types/EnergyTypes';

const Status = () => {
  const { gameState } = useGame();
  const { phase, turn, turnsInPhase, progressPoints, money, resources, technologySizes } =
    gameState;

  const orderedTechnologyTypes: TechnologyType[] = ['Generation', 'Distribution', 'Storage'];
  const orderedEnergyTypes: EnergyType[] = ['Electricity', 'Heat'];

  return (
    <Box
      sx={{
        position: 'relative',
        width: 200,
        height: 500,
        backgroundColor: 'lightgrey',
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6">
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
              <SmallEnergyIcon
                key={`${technologyType}-${energyType}`}
                technology={technologyType}
                energy={energyType}
                size={technologySizes[technologyType][energyType]}
              />
            ))}
          </Box>
        ))}
      </Box>

      <PhaseObjective />
    </Box>
  );
};

const SmallEnergyIcon: React.FC<EnergyCharacteristics> = ({ technology, energy, size }) => {
  return (
    <Box
      sx={{
        transform: 'scale(0.8)',
      }}
    >
      <EnergyIcon technology={technology} energy={energy} size={size} />
    </Box>
  );
};

export default Status;
