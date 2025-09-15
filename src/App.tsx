import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NavBar from './components/NavBar';
import Play from './pages/Play';
import Rules from './pages/Rules';
import { Box } from '@mui/material';
import { GameProvider } from './context/GameContext';
import { ActionProvider } from './context/ActionContext';
import { CardAnimationProvider } from './context/CardAnimationContext';
import { SessionProvider } from './context/SessionContext';
// import { WebSocketProvider } from './ws/WebSocketProvider';
import { SendMessageProvider } from './context/SendMessageContext';
import { DieAnimationProvider } from './context/DieAnimationContext';
import { GameApiProvider } from './context/GameApiContext';
import { USE_MOCK } from './base.ts'

interface AppProps {
  toggleTheme: () => void;
}

const App: React.FC<AppProps> = ({ toggleTheme }) => {
  return (
    <SessionProvider>
      <GameProvider>
        <ActionProvider>
          <GameApiProvider useMock={USE_MOCK}>
            {/* <WebSocketProvider> */}
            <SendMessageProvider useMock={USE_MOCK}>
              <DieAnimationProvider>
                <CardAnimationProvider>
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
                </CardAnimationProvider>
              </DieAnimationProvider>
            </SendMessageProvider>
            {/* </WebSocketProvider> */}
          </GameApiProvider>
        </ActionProvider>
      </GameProvider>
    </SessionProvider>
  );
};

export default App;
