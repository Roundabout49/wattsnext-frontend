import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { Game } from '../types/Game';

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameContextType {
  game: Game | null;
  setGame: React.Dispatch<React.SetStateAction<Game | null>>;
  animateMoneyChange: (amount: number, onComplete?: () => void) => void;
  animateResourcesChange: (amount: number, onComplete?: () => void) => void;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<Game | null>(null);
  // useRef is necessary to only start interval after the first render
  const moneyIntervalRef = useRef<number>(undefined);
  const resourcesIntervalRef = useRef<number>(undefined);

  function animateValueChange(
    getCurrent: (state: Game) => number,
    updateState: (state: Game, value: number) => Game,
    amount: number,
    intervalRef: React.RefObject<number | undefined>,
    onComplete?: () => void
  ) {
    if (!game) return;

    if (amount === 0) {
      onComplete?.();
      return;
    }

    const startValue = getCurrent(game);
    const targetValue = startValue + amount;

    intervalRef.current = window.setInterval(() => {
      setGame((prev) => {
        if (!prev) return prev;
        const current = getCurrent(prev);
        const done =
          (amount > 0 && current >= targetValue) || (amount < 0 && current <= targetValue);

        if (done) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 0);
          return prev;
        }

        const newValue = current + (amount > 0 ? 1 : -1);
        return updateState(prev, newValue);
      });
    }, 250);
  }

  function animateMoneyChange(amount: number, onComplete?: () => void) {
    animateValueChange(
      (state) => state.money,
      (state, newValue) => ({ ...state, money: newValue }),
      amount,
      moneyIntervalRef,
      onComplete
    );
  }

  function animateResourcesChange(amount: number, onComplete?: () => void) {
    animateValueChange(
      (state) => state.resources,
      (state, newValue) => ({ ...state, resources: newValue }),
      amount,
      resourcesIntervalRef,
      onComplete
    );
  }

  return (
    <GameContext.Provider
      value={{ game: game, setGame: setGame, animateMoneyChange, animateResourcesChange }}
    >
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
