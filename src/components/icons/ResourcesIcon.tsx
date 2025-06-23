import { Box } from '@mui/material';

interface ResourcesIconProps {
  resources: number;
}

const ResourcesIcon: React.FC<ResourcesIconProps> = ({ resources }) => {
  return (
    <Box
      sx={{
        width: 35,
        height: 35,
        backgroundColor: 'lightgray',
        color: 'black',
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
