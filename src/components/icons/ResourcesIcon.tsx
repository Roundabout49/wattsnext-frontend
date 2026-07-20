import { Box } from '@mui/material';

interface ResourcesIconProps {
  resources: number;
  /** Overrides the number colour, e.g. to flash green/red while counting. */
  color?: string;
}

const ResourcesIcon: React.FC<ResourcesIconProps> = ({ resources, color }) => {
  return (
    <Box
      sx={{
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
    </Box>
  );
};
export default ResourcesIcon;
