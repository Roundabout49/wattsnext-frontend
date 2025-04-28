import { Box } from '@mui/material';
// import { useGame } from '../context/GameContext';
import PriceIcon from './PriceIcon';
import ResourcesIcon from './ResourcesIcon';
import EnergyIcon from './EnergyIcon';
import { EnergyCharacteristics } from '../types/EnergyCharacteristics';

const Status = () => {
  // const { gameState } = useGame();
  const energy: EnergyCharacteristics = {
    technology: 'Storage',
    energy: 'Electricity',
    size: 2,
  };

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
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <PriceIcon price={1} />
        <ResourcesIcon resources={1} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <EnergyIcon {...energy} />
        <EnergyIcon {...energy} />
        <EnergyIcon {...energy} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <EnergyIcon {...energy} />
        <EnergyIcon {...energy} />
        <EnergyIcon {...energy} />
      </Box>
    </Box>
  );
};

export default Status;
