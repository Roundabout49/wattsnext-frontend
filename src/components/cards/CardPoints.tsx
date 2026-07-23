import { createElement, FC, ReactNode } from 'react';
import {
  Achievements,
  isEnergy,
  isAchievement,
  ModifiableValue,
  ProgressPoints,
} from '../../types/ProgressCards';
import { Box, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EnergyIcon from '../icons/EnergyIcon';
import PointsIcon from '../icons/PointsIcon';

/** Small corner marker on the system points icon (red X = blocked, green check = guaranteed). */
const StatusBadge: FC<{ icon: ReactNode; color: string }> = ({ icon, color }) => (
  <Box
    sx={{
      position: 'absolute',
      top: -8,
      left: -8,
      width: 22,
      height: 22,
      borderRadius: '50%',
      backgroundColor: '#fff',
      border: `2px solid ${color}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    }}
  >
    {icon}
  </Box>
);

const CardPoints: FC<{ modifiablePoints: ModifiableValue<ProgressPoints> }> = ({
  modifiablePoints,
}) => {
  const points = modifiablePoints.modifiedValue;

  // A `never` requirement means the system points can never be reached, no matter the other conditions.
  const systemPointsBlocked = points.conditions?.some((cond) => cond.type === 'never') ?? false;

  // A modifier that clears all conditions (e.g. "Windiges Wetter") guarantees the system points.
  // Detected by the base conditions being non-empty while the modified ones are empty.
  const systemPointsGuaranteed =
    (modifiablePoints.originalValue.conditions?.length ?? 0) > 0 &&
    (points.conditions?.length ?? 0) === 0;

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
        {points.baseProgressPoints != null ? (
          <PointsIcon
            points={points.baseProgressPoints}
            leafColor="grey"
            textColor={points.conditionsFulfilled ? 'grey' : 'black'}
          />
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
            {points.conditions && points.conditions.every(isAchievement)
              ? points.conditions.map((cond, index) => (
                  <Box key={index} sx={{ position: 'relative', top: 10, padding: 1 }}>
                    {createElement(Achievements[cond.name].icon, { sx: { fontSize: 28 } })}
                  </Box>
                ))
              : points.conditions &&
                points.conditions.map((cond, index) =>
                  isAchievement(cond) ? (
                    <Box key={index} sx={{ position: 'relative', top: 0, padding: 1 }}>
                      {createElement(Achievements[cond.name].icon, { sx: { fontSize: 28 } })}
                    </Box>
                  ) : isEnergy(cond) ? (
                    <Box key={index} sx={{ position: 'relative', top: 0, transform: 'scale(0.6)' }}>
                      <EnergyIcon {...cond} />
                    </Box>
                  ) : null
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

        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <PointsIcon
            points={points.systemProgressPoints}
            leafColor="green"
            textColor={points.conditionsFulfilled ? 'black' : 'gray'}
          />
          {systemPointsBlocked && (
            <StatusBadge color="#c62828" icon={<CloseIcon sx={{ fontSize: 16, color: '#c62828' }} />} />
          )}
          {systemPointsGuaranteed && (
            <StatusBadge color="#2e7d32" icon={<CheckIcon sx={{ fontSize: 16, color: '#2e7d32' }} />} />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default CardPoints;
