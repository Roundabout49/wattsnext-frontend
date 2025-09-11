// src/context/GameApiProvider.tsx
import React, { createContext, useContext } from 'react';
import { GameApiService } from '../services/GameApiService';
import { useHttpGameApiService } from '../services/HttpGameApiService';
import { useMockGameApiService } from '../services/MockGameApiService';
import { useGame } from './GameContext';

const GameApiContext = createContext<GameApiService | undefined>(undefined);

export const GameApiProvider = ({
  children,
  useMock = false,
}: {
  children: React.ReactNode;
  useMock?: boolean;
}) => {
  const { setGame } = useGame();
  const service = useMock ? useMockGameApiService(setGame) : useHttpGameApiService();

  return <GameApiContext.Provider value={service}>{children}</GameApiContext.Provider>;
};

export const useGameApi = (): GameApiService => {
  const ctx = useContext(GameApiContext);
  if (!ctx) throw new Error('useGameApi must be used within GameApiProvider');
  return ctx;
};
