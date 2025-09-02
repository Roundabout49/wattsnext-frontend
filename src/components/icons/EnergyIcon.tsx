import { Box, SvgIcon, Typography } from '@mui/material';
import { TechnologyTypes } from '../../types/TechnologyTypes';
import { EnergyForm, EnergyForms } from '../../types/EnergyForms';
import { Supply } from '../../types/ProgressCards';

const shapes = {
  circle: <circle cx="50" cy="50" r="42" fill="currentColor" stroke="black" strokeWidth="3" />,
  star: (
    <polygon
      points="92.74,50.0 78.93,34.42 75.36,13.91 54.57,15.0 36.32,5.0 24.2,21.93 5.0,29.97 10.69,50.0 5.0,70.03 24.2,78.07 36.32,95.0 54.57,85.0 75.36,86.09 78.93,65.58"
      fill="currentColor"
      stroke="black"
      strokeWidth="3"
    />
  ),
  pentagon: (
    <polygon
      points="50,5 95,35 80,85 20,85 5,35"
      fill="currentColor"
      stroke="black"
      strokeWidth="3"
    />
  ),
};

type EnergyIconProps = Omit<Extract<Supply, { type: 'energy' }>, 'form' | 'type'> & {
  form?: EnergyForm;
};

export type Shape = keyof typeof shapes;

const EnergyIcon: React.FC<EnergyIconProps> = ({ technology, size, form }) => {
  const { color, shape } = TechnologyTypes[technology];
  const IconComponent = form ? EnergyForms[form].icon : null;

  return (
    <Box position="relative" width={50} height={50} display="inline-block">
      <SvgIcon component="svg" viewBox="0 0 100 100" sx={{ fontSize: 60, color }}>
        {shapes[shape]}
      </SvgIcon>
      {IconComponent && (
        <Box position="absolute" top="65%" left="42%" sx={{ transform: 'translate(-50%, -50%)' }}>
          <IconComponent fontSize="large" />
        </Box>
      )}
      <Typography
        variant="h5"
        sx={{
          position: 'absolute',
          top: '57%',
          right: IconComponent ? '10%' : '27%',
          transform: 'translateY(-50%)',
          fontWeight: 'bold',
        }}
      >
        {size}
      </Typography>
    </Box>
  );
};

export default EnergyIcon;
