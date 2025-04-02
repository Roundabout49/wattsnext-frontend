import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

interface AppProps {
  toggleTheme: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
const App: React.FC<AppProps> = ({ toggleTheme }) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
