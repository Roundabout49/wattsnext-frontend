import { Box } from '@mui/material';
import EnergyIcon from './EnergyIcon';

interface EnergySystemIconProps {
  size?: number;
}

// Marker for effects on the energy system / phase targets: the three technology
// shapes clustered into one icon, used regardless of which technology is
// actually affected. Reuses EnergyIcon (without number or energy symbol).
const EnergySystemIcon: React.FC<EnergySystemIconProps> = ({ size = 40 }) => {
  const scale = size / 135;

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <Box sx={{ position: 'absolute', top: '30%', left: '48%', transform: `translate(-50%, -50%) scale(${scale})` }}>
        <EnergyIcon technology="Generation" />
      </Box>
      <Box sx={{ position: 'absolute', top: '68%', left: '29%', transform: `translate(-50%, -50%) scale(${scale})` }}>
        <EnergyIcon technology="Distribution" />
      </Box>
      <Box sx={{ position: 'absolute', top: '68%', left: '67%', transform: `translate(-50%, -50%) scale(${scale})` }}>
        <EnergyIcon technology="Storage" />
      </Box>
    </Box>
  );
};

export default EnergySystemIcon;
