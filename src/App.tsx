import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NavBar from './components/NavBar';
import Play from './pages/Play';
import Rules from './pages/Rules';

interface AppProps {
  toggleTheme: () => void;
}

// eslint-disable-next-line react/prop-types
const App: React.FC<AppProps> = ({ toggleTheme }) => {
  return (
    <div>
      <NavBar toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/play" element={<Play />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </div>
  );
};

export default App;
