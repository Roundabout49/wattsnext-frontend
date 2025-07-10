import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { GameState } from '../types/GameState';
import { exampleGameState } from '../assets/ExampleData';

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  animateMoneyChange: (amount: number, onComplete?: () => void) => void;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(exampleGameState);
  // useRef is necessary to only start interval after the first render
  const intervalRef = useRef<number>(undefined);

  function animateMoneyChange(amount: number, onComplete?: () => void) {
    const startMoney = gameState.money;
    const targetMoney = startMoney + amount;

    intervalRef.current = window.setInterval(() => {
      setGameState((prev) => {
        const current = prev.money;
        const done =
          (amount > 0 && current >= targetMoney) || (amount < 0 && current <= targetMoney);

        if (done) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 0);
          return prev;
        }

        return {
          ...prev,
          money: current + (amount > 0 ? 1 : -1),
        };
      });
    }, 250);
  }

  return (
    <GameContext.Provider value={{ gameState, setGameState, animateMoneyChange }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
