import { Box } from '@mui/material';

interface MoneyAndResourcesIconProps {
  size?: number;
}

// Combined marker for money-and-resource effects: resource square top-left,
// coin bottom-right, mirroring the board-game icon. Colours match ResourcesIcon
// and PriceIcon.
const MoneyAndResourcesIcon: React.FC<MoneyAndResourcesIconProps> = ({ size = 34 }) => {
  const part = size * 0.54;
  // Keep the border-to-size ratio in line with PointsIcon (2px on 35px).
  const border = part * (2 / 35);

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: part,
          height: part,
          backgroundColor: '#8a8a8a',
          border: `${border}px solid black`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: part,
          height: part,
          borderRadius: '50%',
          backgroundColor: '#d4972b',
          border: `${border}px solid black`,
        }}
      />
    </Box>
  );
};

export default MoneyAndResourcesIcon;
