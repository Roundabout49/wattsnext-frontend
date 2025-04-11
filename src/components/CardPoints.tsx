import { FC } from 'react';
import SpaIcon from '@mui/icons-material/Spa';
import { Points } from '../types/ProgressCards';
import { Box, Stack, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const CardPoints: FC<{ points: Points }> = ({ points }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        {points.basePoints != null && <PointsIcon points={points.basePoints} color="grey" />}
        <ArrowForward sx={{ fontSize: 32 }} />
        <PointsIcon points={points.systemPoints} color="green" />
      </Stack>
    </Box>
  );
};

const PointsIcon: FC<{ points: number; color: string }> = ({ points, color }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '2px solid black',
        backgroundColor: 'transparent',
      }}
    >
      <Typography fontWeight="bold">{points}</Typography>
      <SpaIcon
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          fontSize: 16,
          color: color,
        }}
      />
    </Box>
  );
};

export default CardPoints;
