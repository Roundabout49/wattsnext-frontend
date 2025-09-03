import { Box } from '@mui/material';
import Board from '../components/Board';
import Status from '../components/Status';
import HandCards from '../components/HandCards';
import ActionBar from '../components/ActionBar';
import { PlayCardHandler } from '../handlers/PlayCardHandler';
import { EarnMoneyHandler } from '../handlers/EarnMoneyHandler';
import AnimationOverlay from '../components/AnimationOverlay';

export default function GamePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: 1 }}>
      <AnimationOverlay />

      <ActionBar />

      <PlayCardHandler />
      <EarnMoneyHandler />

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            p: 1,
            gap: 1,
          }}
        >
          <Board />
          <HandCards />
        </Box>
        <Box
          sx={{
            width: 180,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 1,
          }}
        >
          <Status />
          <Box
            sx={{
              flex: 1, // fill remaining space
              overflowY: 'auto', // scrollable if needed
              p: 1,
            }}
          >
            Historie
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
