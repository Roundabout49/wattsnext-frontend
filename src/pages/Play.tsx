import { Box } from '@mui/material';
import Board from '../components/Board';
import Status from '../components/Status';

export default function Play() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* TODO: Handkarten */}
      <Box sx={{ flex: 1, p: 1 }}>
        <Board />
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
  );
}
