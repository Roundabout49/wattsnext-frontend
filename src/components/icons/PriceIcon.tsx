import { Box } from '@mui/material';

interface PriceIconProps {
  price?: number;
  /** Overrides the number colour, e.g. to flash green/red while counting. */
  color?: string;
}

const PriceIcon: React.FC<PriceIconProps> = ({ price, color }) => {
  return (
    <Box
      sx={{
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
    </Box>
  );
};

export default PriceIcon;
