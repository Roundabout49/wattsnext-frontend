import { Box, CardMedia, Typography } from '@mui/material';
import EnergyIcon from '../icons/EnergyIcon';
import { Achievement, Achievements, ModifiableValue, Supply } from '../../types/ProgressCards';
import PriceIcon from '../icons/PriceIcon';
import ResourcesIcon from '../icons/ResourcesIcon';
import { costModification, ModificationBadgeInfo } from '../../utils/valueModification';

const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
const toRoman = (n: number) => romanNumerals[n - 1] ?? String(n);

/**
 * Small original value shown next to a modified cost icon, struck through diagonally
 * (bottom-left to top-right) to signal it was replaced.
 */
const OriginalValue: React.FC<{ value: number }> = ({ value }) => (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <Typography sx={{ fontSize: '0.85rem', lineHeight: 1, color: 'text.secondary' }}>
      {value}
    </Typography>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '-20%',
        width: '140%',
        height: '1.5px',
        backgroundColor: 'text.secondary',
        transform: 'rotate(-30deg)',
        transformOrigin: 'center',
      }}
    />
  </Box>
);

interface ProgressCardTopProps {
  title: string;
  image: string;
  price: ModifiableValue<number>;
  resources: ModifiableValue<number>;
  type: 'technology' | 'climateAction';
  // 1-indexed phase; when set, its Roman numeral is shown in the top-right corner
  phase?: number;
  // Show the original value next to modified cost icons (only fits on the large card).
  showOriginalValues?: boolean;
}

interface TechnologyCardTopProps extends ProgressCardTopProps {
  type: 'technology';
  supply: Extract<Supply, { type: 'energy' }>;
  supplyModification?: ModificationBadgeInfo;
}

interface ClimateActionCardTopProps extends ProgressCardTopProps {
  type: 'climateAction';
  achievement?: Achievement;
}

const ProgressCardTop: React.FC<{ card: TechnologyCardTopProps | ClimateActionCardTopProps }> = ({
  card,
}) => {
  const IconComponent =
    card.type === 'climateAction'
      ? card.achievement
        ? Achievements[card.achievement]?.icon
        : null
      : null;

  const imageSrc =
    card.image !== '' ? new URL(`../../assets/images/${card.image}`, import.meta.url).href : '';

  const priceModification = costModification(card.price);
  const resourcesModification = costModification(card.resources);

  return (
    <div style={{ width: 225, height: 150, position: 'relative', padding: 0 }}>
      <Box sx={{ position: 'absolute', top: 2, left: 2 }}>
        {card.type === 'technology' ? (
          <EnergyIcon {...card.supply} modification={card.supplyModification} />
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
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <PriceIcon price={card.price.modifiedValue} modification={priceModification} />
        {card.showOriginalValues && priceModification && (
          <OriginalValue value={card.price.originalValue} />
        )}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 115,
          left: 12.5,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <ResourcesIcon resources={card.resources.modifiedValue} modification={resourcesModification} />
        {card.showOriginalValues && resourcesModification && (
          <OriginalValue value={card.resources.originalValue} />
        )}
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150, marginTop: 1, marginRight: 1, marginLeft: 'auto' }}
        image={imageSrc}
        alt={card.title}
      />
      {card.phase != null && (
        // Overlaid on a white circle in the top-right corner so the numeral stays readable
        // even when it sits directly on the image.
        <Box
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            zIndex: 1,
            width: 22,
            height: 22,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, lineHeight: 1, color: 'black' }}>
            {toRoman(card.phase)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ProgressCardTop;
