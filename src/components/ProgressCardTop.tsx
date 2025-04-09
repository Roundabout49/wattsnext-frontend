import { EnergyCharacteristics } from '../types/EnergyCharacteristics';
import { Box, CardMedia } from '@mui/material';
import EnergyIcon from './EnergyIcon';

interface ProgressCardTopProps {
  title: string;
  image: string;
  price: number;
  resources: number;
  type: EnergyCharacteristics;
}

const ProgressCardTop: React.FC<ProgressCardTopProps> = ({
  title,
  image,
  price,
  resources,
  type,
}) => {
  return (
    <div style={{ width: 225, height: 150, position: 'relative', padding: 0 }}>
      <Box sx={{ position: 'absolute', top: 2, left: 2 }}>
        <EnergyIcon {...type} />
      </Box>
      <Box sx={{ position: 'absolute', top: 60, left: 2 }}>
        {/* TODO: Add price and resources here */}
        {price}
      </Box>
      <Box sx={{ position: 'absolute', top: 100, left: 2 }}>
        {/* TODO: Add price and resources here */}
        {resources}
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150, marginTop: 1, marginRight: 1, marginLeft: 'auto' }}
        image={image}
        alt={title}
      />
    </div>
  );
};

export default ProgressCardTop;
