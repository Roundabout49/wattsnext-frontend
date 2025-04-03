import { Box, Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import { EnergyType } from '../types/EnergyTypes';
import { TechnologyType } from '../types/TechnologyTypes';
import { EnergyCharacteristics } from '../types/EnergyCharacteristics';

// TODO: Add conditions (for systemPoints)
interface ProgressCardProps {
  title: string;
  image: string;
  text: string;
  explanation: string;
  basePoints?: number;
  systemPoints: number;
  price: number;
  resources: number;
  type: EnergyCharacteristics;
}

// TODO: Climate Actions
const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  image,
  text,
  explanation,
  basePoints,
  systemPoints,
  price,
  resources,
  type,
}) => {
  return (
    <Card sx={{ width: 225, height: 400, position: 'relative', padding: 0 }}>
      <Box sx={{ position: 'absolute', top: 2, left: 2 }}>
        {/* TODO: Add icon here */}
        {type.technology}
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

      <CardContent sx={{ padding: 0 }}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            padding: 0.5,
            textAlign: 'center',
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ marginLeft: 0.5, marginRight: 0.5 }}>
          {text}
        </Typography>

        <Divider sx={{ position: 'absolute', top: 330, left: 0, right: 0 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            position: 'absolute',
            top: 330,
            fontSize: '0.8rem',
            marginTop: 1,
            marginLeft: 0.5,
            marginRight: 0.5,
          }}
        >
          {explanation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
