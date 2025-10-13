import { createContext, ReactNode, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

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
  // TODO: useLocalStorage statt State für Reload
  const [gameId, setGameId] = useLocalStorage<string | null>('gameId', null);
  const [playerId, setPlayerId] = useLocalStorage<string | null>('playerId', null);
  const [playerName, setPlayerName] = useLocalStorage<string | null>('playerName', null);

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
