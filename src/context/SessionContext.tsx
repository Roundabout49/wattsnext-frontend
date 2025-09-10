import { createContext, ReactNode, useContext, useState } from 'react';

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// TODO: Is playerName even needed here?
interface SessionContextType {
  gameId: string | null;
  playerId: string | null;
  playerName: string | null;
  setSession: (gameId: string, playerId: string, playerName: string) => void;
  clearSession: () => void;
  // TODO: Can probably be removed eventually
  setPlayerId: (id: string) => void;
  setPlayerName: (name: string) => void;
}

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>('player1'); // TODO: Set to null
  const [playerName, setPlayerName] = useState<string | null>(null);

  const setSession = (gameId: string, playerId: string, playerName: string) => {
    setGameId(gameId);
    setPlayerId(playerId);
    setPlayerName(playerName);
  };

  const clearSession = () => {
    setGameId(null);
    setPlayerId(null);
    setPlayerName(null);
  };

  return (
    <SessionContext.Provider
      value={{ gameId, playerId, playerName, setSession, clearSession, setPlayerId, setPlayerName }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
