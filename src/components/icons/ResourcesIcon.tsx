import { Box } from '@mui/material';
import ModificationBadge from '../cards/ModificationBadge';
import { ModificationBadgeInfo } from '../../utils/valueModification';

interface ResourcesIconProps {
  resources: number;
  /** Overrides the number colour, e.g. to flash green/red while counting. */
  color?: string;
  /** When set, shows a corner badge marking that the value was modified. */
  modification?: ModificationBadgeInfo;
}

const ResourcesIcon: React.FC<ResourcesIconProps> = ({ resources, color, modification }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 35,
        height: 35,
        backgroundColor: '#8a8a8a',
        color: color ?? 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1rem',
        border: '2px solid black',
      }}
    >
      {resources}
      {modification && <ModificationBadge info={modification} />}
    </Box>
  );
};
export default ResourcesIcon;
