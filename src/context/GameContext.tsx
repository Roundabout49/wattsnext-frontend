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

/* const emptyGameState: GameState = {
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
  progressPoints: 0,
  technologySizes: {
    Storage: { Electricity: 0, Heat: 0 },
    Generation: { Electricity: 0, Heat: 0 },
    Distribution: { Electricity: 0, Heat: 0 },
  },
  drawPileProgress: [],
  drawPileEvents: [],
  drawPileBadEvents: [],
}; */

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
  money: 5,
  resources: 13,
  progressPoints: 17,
  technologySizes: {
    Storage: { Electricity: 2, Heat: 0 },
    Generation: { Electricity: 4, Heat: 0 },
    Distribution: { Electricity: 3, Heat: 0 },
  },
  drawPileProgress: [],
  drawPileEvents: [],
  drawPileBadEvents: [],
  phase: 1,
  turn: 8,
  turnsInPhase: 12,
  phaseObjectives: {
    1: {
      objective: {
        progressPoints: 25,
        technologyTypes: {
          Generation: 3,
          Distribution: 3,
          Storage: 0,
        },
        energyTypes: ['Electricity', 'Heat'],
      },
    },
    2: {
      objective: {
        progressPoints: 50,
        technologyTypes: {
          Generation: 6,
          Distribution: 6,
          Storage: 3,
        },
        energyTypes: ['Electricity', 'Heat'],
      },
    },
    3: {
      objective: {
        progressPoints: 75,
        technologyTypes: {
          Generation: 9,
          Distribution: 9,
          Storage: 6,
        },
        energyTypes: ['Electricity', 'Heat'],
      },
    },
  },
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
