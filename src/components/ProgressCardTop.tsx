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
      <Box
        sx={{
          position: 'absolute',
          top: 70,
          left: 12.5,
          width: 35,
          height: 35,
          borderRadius: '50%',
          backgroundColor: 'gold',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '1rem',
          border: '2px solid black',
        }}
      >
        {price}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 115,
          left: 15,
          width: 30,
          height: 30,
          backgroundColor: 'lightgray',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '1rem',
          border: '2px solid black',
        }}
      >
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
