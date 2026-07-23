import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EnergyLandscape from '../components/EnergyLandscape';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <div style={{ marginTop: '3rem' }}>
        <h1>Willkommen bei WATT&apos;S NEXT Online!</h1>
        <p>Ein kooperatives Online-Spiel zur Energiewende.</p>

        <Stack spacing={2} justifyContent="center" alignItems="center" mt={4}>
          <Button variant="contained" size="large" onClick={() => navigate('/play')}>
            Jetzt spielen
          </Button>

          <Button variant="outlined" size="large" onClick={() => navigate('/rules')}>
            Lernen
          </Button>
        </Stack>
      </div>

      {/* Band docks to the bottom of the page so the hills meet the edge */}
      <Box sx={{ mt: 'auto' }}>
        <EnergyLandscape />
      </Box>
    </Box>
  );
};

export default Home;
