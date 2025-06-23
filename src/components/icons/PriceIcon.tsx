import { Box } from '@mui/material';

interface PriceIconProps {
  price: number;
}

const PriceIcon: React.FC<PriceIconProps> = ({ price }) => {
  return (
    <Box
      sx={{
        width: 35,
        height: 35,
        borderRadius: '50%',
        backgroundColor: 'brown',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1rem',
        border: '2px solid black',
      }}
    >
      {price}
    </Box>
  );
};

export default PriceIcon;
