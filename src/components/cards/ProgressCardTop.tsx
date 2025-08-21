import { Box, CardMedia } from '@mui/material';
import EnergyIcon from '../icons/EnergyIcon';
import { Icon, Icons, ModifiableValue, Supply } from '../../types/ProgressCards';
import PriceIcon from '../icons/PriceIcon';
import ResourcesIcon from '../icons/ResourcesIcon';

interface ProgressCardTopProps {
  title: string;
  image: string;
  price: ModifiableValue<number>;
  resources: ModifiableValue<number>;
  type: 'technology' | 'climateAction';
}

interface TechnologyCardTopProps extends ProgressCardTopProps {
  type: 'technology';
  supply: ModifiableValue<Extract<Supply, { type: 'energy' }>>;
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
          <EnergyIcon {...card.supply} />
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
        }}
      >
        <PriceIcon price={card.price.originalValue} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 115,
          left: 12.5,
        }}
      >
        <ResourcesIcon resources={card.resources.originalValue} />
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
