import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import SpaIcon from '@mui/icons-material/Spa';

const PointsIcon: FC<{ points: number; color: string }> = ({ points, color }) => {
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
        border: '2px solid black',
        backgroundColor: 'transparent',
      }}
    >
      <Typography fontWeight="bold">{points}</Typography>
      <SpaIcon
        sx={{
          position: 'absolute',
          bottom: -2,
          left: -2,
          fontSize: 16,
          color: color,
        }}
      />
    </Box>
  );
};

export default PointsIcon;
