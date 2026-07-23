import { Box } from '@mui/material';
import ModificationBadge from '../cards/ModificationBadge';
import { ModificationBadgeInfo } from '../../utils/valueModification';

interface PriceIconProps {
  price?: number;
  /** Overrides the number colour, e.g. to flash green/red while counting. */
  color?: string;
  /** When set, shows a corner badge marking that the value was modified. */
  modification?: ModificationBadgeInfo;
}

const PriceIcon: React.FC<PriceIconProps> = ({ price, color, modification }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 35,
        height: 35,
        borderRadius: '50%',
        backgroundColor: '#d4972b',
        color: color ?? 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1rem',
        border: '2px solid black',
      }}
    >
      {price !== undefined && price}
      {modification && <ModificationBadge info={modification} />}
    </Box>
  );
};

export default PriceIcon;
