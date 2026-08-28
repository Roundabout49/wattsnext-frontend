import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import SpaIcon from '@mui/icons-material/Spa';

interface PointsIconProps {
  points?: number;
  leafColor: string;
  textColor?: string;
  size?: number;
}

const PointsIcon: FC<PointsIconProps> = ({ points, leafColor, textColor = 'black', size = 35 }) => {
  const scale = size / 35;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${textColor}`,
        backgroundColor: 'transparent',
        // Keep the circle from being squished when placed in a flex row narrower than its size.
        flexShrink: 0,
      }}
    >
      <Typography fontWeight="bold" sx={{ color: textColor, fontSize: `${scale}rem` }}>
        {points}
      </Typography>
      <SpaIcon
        sx={{
          position: 'absolute',
          bottom: -2 * scale,
          left: -2 * scale,
          fontSize: 16 * scale,
          color: leafColor,
        }}
      />
    </Box>
  );
};

export default PointsIcon;
