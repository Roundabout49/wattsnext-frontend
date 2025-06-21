import { createContext, ReactNode, useContext, useState } from 'react';

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface PlayerContextType {
  playerId: string | null;
  playerName: string | null;
  setPlayerId: (id: string | null) => void;
  setPlayerName: (name: string | null) => void;
}

export const PlayerIdProvider = ({ children }: { children: ReactNode }) => {
  const [playerId, setPlayerId] = useState<string | null>('player1'); // TODO: Set to null
  const [playerName, setPlayerName] = useState<string | null>(null);

  return (
    <PlayerContext.Provider value={{ playerId, playerName, setPlayerId, setPlayerName }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerId must be used within a PlayerIdProvider');
  }
  return context;
};
