import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { TechnologyTypes } from '../../types/TechnologyTypes';
import ProgressCardTop from './ProgressCardTop';
import { ProgressCard } from '../../types/ProgressCards';
import CardPoints from './CardPoints';

const ProgressCardLarge: React.FC<{ card: ProgressCard }> = ({ card }) => {
  const color =
    card.type === 'technology'
      ? TechnologyTypes[card.supply.modifiedValue.technology].color
      : '#70AD47';

  const showPoints = !(
    card.type === 'technology' && card.supply.modifiedValue.technology === 'Distribution'
  );

  return (
    <Card sx={{ width: 225, height: 400, position: 'relative', padding: 0 }}>
      {card.type === 'technology' ? (
        <ProgressCardTop
          card={{
            title: card.name,
            image: card.image,
            price: card.moneyCosts,
            resources: card.resourceCosts,
            type: card.type,
            supply: card.supply.modifiedValue,
          }}
        ></ProgressCardTop>
      ) : (
        <ProgressCardTop
          card={{
            title: card.name,
            image: card.image,
            price: card.moneyCosts,
            resources: card.resourceCosts,
            type: card.type,
            achievement: card.supply.modifiedValue?.name,
          }}
        ></ProgressCardTop>
      )}

      <CardContent sx={{ padding: 0 }}>
        <Box
          sx={{
            backgroundColor: color,
            padding: 0.5,
            textAlign: 'center',
            marginTop: 1,
            marginBottom: 1,
            height: 45,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1rem', lineHeight: 1 }}>
            {card.name}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            marginLeft: 1,
            marginRight: 1,
            lineHeight: 1,
            fontSize: card.text.length > 100 ? '0.75rem' : undefined,
          }}
        >
          {card.text}
        </Typography>

        <Box sx={{ position: 'absolute', top: 272, left: 0, right: 0 }}>
          {showPoints && card.points && <CardPoints modifiablePoints={card.points} />}
        </Box>

        <Divider sx={{ position: 'absolute', top: 330, left: 0, right: 0 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            position: 'absolute',
            top: 330,
            fontSize: '0.7rem',
            lineHeight: 1,
            marginTop: 1,
            marginLeft: 1,
            marginRight: 1,
          }}
        >
          {card.explanation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgressCardLarge;
