import { Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ModificationBadgeInfo } from '../../utils/valueModification';

const favorableColor = '#2e7d32';
const unfavorableColor = '#c62828';

/**
 * Small corner badge marking that a card value was modified. The arrow shows the
 * numeric direction, the colour whether the change helps (green) or hurts (red) the player.
 * Meant to be placed inside a `position: relative` container.
 */
const ModificationBadge: React.FC<{ info: ModificationBadgeInfo }> = ({ info }) => {
  const color = info.favorable ? favorableColor : unfavorableColor;
  const Arrow = info.direction === 'up' ? ArrowUpwardIcon : ArrowDownwardIcon;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: -11,
        right: -11,
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
      <Arrow sx={{ fontSize: 16, color }} />
    </Box>
  );
};

export default ModificationBadge;
