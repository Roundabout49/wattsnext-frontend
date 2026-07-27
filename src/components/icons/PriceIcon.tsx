import { Box } from '@mui/material';
import ModificationBadge from '../cards/ModificationBadge';
import { ModificationBadgeInfo } from '../../utils/valueModification';

interface PriceIconProps {
  price?: number;
  /** Overrides the number colour, e.g. to flash green/red while counting. */
  color?: string;
  /** When set, shows a corner badge marking that the value was modified. */
  modification?: ModificationBadgeInfo;
  /** Diameter in px. Defaults to the status-bar size. */
  size?: number;
}

const PriceIcon: React.FC<PriceIconProps> = ({ price, color, modification, size = 35 }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#d4972b',
        color: color ?? 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: size * 0.46,
        // Same border-to-size ratio as the other icons (2px on 35px), so the default is unchanged.
        border: `${size * (2 / 35)}px solid black`,
      }}
    >
      {price !== undefined && price}
      {modification && <ModificationBadge info={modification} />}
    </Box>
  );
};

export default PriceIcon;
