import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Willkommen bei ENZo Online!</h1>
      <p>Ein kooperatives Online-Spiel zur Energiewende.</p>
      <Button onClick={() => alert('Spiel startet bald!')}>Spiel starten</Button>
      <button onClick={() => alert('Spiel startet bald!')}>Spiel starten</button>
      <div>
        <Link to="/about">Go to About</Link>
      </div>
    </div>
  );
};

export default Home;
