import { Button } from '@mui/material';

const Home = () => {
  return (
    <div>
      <h1>Willkommen bei ENZo Online!</h1>
      <p>Ein kooperatives Online-Spiel zur Energiewende.</p>
      <Button onClick={() => alert('Spiel startet bald!')}>Spiel starten</Button>
    </div>
  );
};

export default Home;
