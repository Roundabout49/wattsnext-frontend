import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NavBar from './components/NavBar';
import Play from './pages/Play';
import Rules from './pages/Rules';
import { Box } from '@mui/material';
import { GameProvider } from './context/GameContext';
import { ActionProvider } from './context/ActionContext';
import { AnimationProvider } from './context/AnimationContext';
import { PlayerIdProvider } from './context/PlayerContext';
import { WebSocketProvider } from './ws/WebSocketProvider';
import { SendMessageProvider } from './context/SendMessageContext';

interface AppProps {
  toggleTheme: () => void;
}

const App: React.FC<AppProps> = ({ toggleTheme }) => {
  return (
    <WebSocketProvider>
      <GameProvider>
        <ActionProvider>
          <SendMessageProvider useMock={true}>
            <AnimationProvider>
              <PlayerIdProvider>
                <div>
                  <NavBar toggleTheme={toggleTheme} />
                  <Box sx={{ padding: 0 }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/play" element={<Play />} />
                      <Route path="/rules" element={<Rules />} />
                    </Routes>
                  </Box>
                </div>
              </PlayerIdProvider>
            </AnimationProvider>
          </SendMessageProvider>
        </ActionProvider>
      </GameProvider>
    </WebSocketProvider>
  );
};

export default App;
