import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
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
  );
};

export default Home;
