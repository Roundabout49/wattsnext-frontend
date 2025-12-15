import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import SpaIcon from '@mui/icons-material/Spa';

interface PointsIconProps {
  points: number;
  leafColor: string;
  textColor?: string;
}

const PointsIcon: FC<PointsIconProps> = ({ points, leafColor, textColor = 'black' }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        borderRadius: '50%',
        border: `2px solid ${textColor}`,
        backgroundColor: 'transparent',
      }}
    >
      <Typography fontWeight="bold" sx={{ color: textColor }}>
        {points}
      </Typography>
      <SpaIcon
        sx={{
          position: 'absolute',
          bottom: -2,
          left: -2,
          fontSize: 16,
          color: leafColor,
        }}
      />
    </Box>
  );
};

export default PointsIcon;
