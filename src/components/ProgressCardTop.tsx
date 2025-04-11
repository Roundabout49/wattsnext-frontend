import { EnergyCharacteristics } from '../types/EnergyCharacteristics';
import { Box, CardMedia } from '@mui/material';
import EnergyIcon from './EnergyIcon';
import { Icon, Icons } from '../types/ProgressCards';

interface ProgressCardTopProps {
  title: string;
  image: string;
  price: number;
  resources: number;
  type: 'technology' | 'climateAction';
}

interface TechnologyCardTopProps extends ProgressCardTopProps {
  type: 'technology';
  energyCharacteristics: EnergyCharacteristics;
}

interface ClimateActionCardTopProps extends ProgressCardTopProps {
  type: 'climateAction';
  icon?: Icon;
}

const ProgressCardTop: React.FC<{ card: TechnologyCardTopProps | ClimateActionCardTopProps }> = ({
  card,
}) => {
  const IconComponent =
    card.type === 'climateAction' ? (card.icon ? Icons[card.icon].icon : null) : null;

  return (
    <div style={{ width: 225, height: 150, position: 'relative', padding: 0 }}>
      <Box sx={{ position: 'absolute', top: 2, left: 2 }}>
        {card.type === 'technology' ? (
          <EnergyIcon {...card.energyCharacteristics} />
        ) : (
          IconComponent && (
            <Box sx={{ position: 'absolute', top: 0, left: 8 }}>
              <IconComponent sx={{ fontSize: 40 }} />
            </Box>
          )
        )}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 70,
          left: 12.5,
          width: 35,
          height: 35,
          borderRadius: '50%',
          backgroundColor: 'brown',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '1rem',
          border: '2px solid black',
        }}
      >
        {card.price}
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
        {card.resources}
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150, marginTop: 1, marginRight: 1, marginLeft: 'auto' }}
        image={card.image}
        alt={card.title}
      />
    </div>
  );
};

export default ProgressCardTop;
