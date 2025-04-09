import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Willkommen bei ENZo Online!</h1>
      <p>Ein kooperatives Online-Spiel zur Energiewende.</p>
      <Button onClick={() => navigate('/play')}>Spiel starten</Button>
    </div>
  );
};

export default Home;
