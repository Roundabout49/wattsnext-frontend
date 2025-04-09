import { Box, Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import { EnergyType } from '../types/EnergyTypes';
import { TechnologyType, TechnologyTypes } from '../types/TechnologyTypes';
import { EnergyCharacteristics } from '../types/EnergyCharacteristics';
import EnergyIcon from './EnergyIcon';
import ProgressCardTop from './ProgressCardTop';

// TODO: Add conditions (for systemPoints)
export interface ProgressCardProps {
  title: string;
  image: string;
  text: string;
  explanation: string;
  basePoints?: number;
  systemPoints?: number;
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
      <ProgressCardTop
        title={title}
        image={image}
        price={price}
        resources={resources}
        type={type}
      ></ProgressCardTop>

      <CardContent sx={{ padding: 0 }}>
        <Box
          sx={{
            backgroundColor: TechnologyTypes[type.technology].color,
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
        <Typography variant="body2" sx={{ marginLeft: 1, marginRight: 1, lineHeight: 1 }}>
          {text}
        </Typography>

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
          {explanation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
