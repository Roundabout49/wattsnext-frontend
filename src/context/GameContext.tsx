import { createContext, ReactNode, useContext, useState } from 'react';
import { GameState } from '../types/GameState';

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const initialGameState: GameState = {
  players: [],
  board: {
    climateActions: [],
    generation: [null, null, null],
    storage: [null, null, null],
    distribution: [null, null, null],
    event: null,
    badEvent: null,
  },
  money: 0,
  resources: 0,
  drawPileProgress: [],
  drawPileEvents: [],
  drawPileBadEvents: [],
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>{children}</GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
