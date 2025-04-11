import { createContext, ReactNode, useContext, useState } from 'react';
import { GameState } from '../types/GameState';
import {
  climateActionCards,
  distributionCards,
  generationCards,
  storageCards,
} from '../assets/CardData';

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const emptyGameState: GameState = {
  players: [],
  board: {
    climateActions: [null, null, null, null, null, null, null, null, null, null],
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

const exampleGameState: GameState = {
  players: [],
  board: {
    climateActions: [
      climateActionCards[0],
      climateActionCards[1],
      climateActionCards[2],
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    generation: [generationCards[0], null, null],
    storage: [storageCards[0], null, null],
    distribution: [distributionCards[0], null, null],
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
  const [gameState, setGameState] = useState<GameState>(exampleGameState);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>{children}</GameContext.Provider>
  );
}

export { GameContext };

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
