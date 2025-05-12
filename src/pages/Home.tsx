import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NameInput from '../components/NameInput';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Willkommen bei ENZo Online!</h1>
      <p>Ein kooperatives Online-Spiel zur Energiewende.</p>
      <NameInput
        onNameSubmit={(name: string) => {
          console.log(name);
        }}
      />
      <Button onClick={() => navigate('/play')}>Spiel starten</Button>
    </div>
  );
};

export default Home;
