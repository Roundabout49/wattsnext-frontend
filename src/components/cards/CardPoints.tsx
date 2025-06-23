import { createElement, FC } from 'react';
import { Icons, Icon, isIcon, Points } from '../../types/ProgressCards';
import { Box, Stack } from '@mui/material';
import EnergyIcon from '../icons/EnergyIcon';
import PointsIcon from '../icons/PointsIcon';

const CardPoints: FC<{ points: Points }> = ({ points }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        width: 225,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
        {points.basePoints != null ? (
          <PointsIcon points={points.basePoints} color="grey" />
        ) : (
          <Box sx={{ width: 32 }} />
        )}

        <Box sx={{ flex: 1, mx: 1, position: 'relative', height: 50 }}>
          <Stack
            direction="row"
            spacing={-1}
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'absolute', top: -15, width: '100%' }}
          >
            {points.conditions && points.conditions.every(isIcon)
              ? points.conditions.map((cond, index) => (
                  <Box key={index} sx={{ position: 'relative', top: 10, padding: 1 }}>
                    {createElement(Icons[cond as Icon].icon, { sx: { fontSize: 28 } })}
                  </Box>
                ))
              : points.conditions &&
                points.conditions.map((cond, index) =>
                  isIcon(cond) ? (
                    <Box key={index} sx={{ position: 'relative', top: 0, padding: 1 }}>
                      {createElement(Icons[cond as Icon].icon, { sx: { fontSize: 28 } })}
                    </Box>
                  ) : (
                    <Box key={index} sx={{ position: 'relative', top: 0, transform: 'scale(0.6)' }}>
                      <EnergyIcon {...cond} />
                    </Box>
                  )
                )}
          </Stack>

          <svg width="100%" height="70">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="black" />
              </marker>
            </defs>
            <line
              x1="0"
              y1="40"
              x2="100%"
              y2="40"
              stroke="black"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        </Box>

        <PointsIcon points={points.systemPoints} color="green" />
      </Stack>
    </Box>
  );
};

export default CardPoints;
