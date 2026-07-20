import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Game } from '../types/Game';
import { useSession } from './SessionContext';
import { fetchGameState } from '../api/gameApi';

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameContextType {
  game: Game | null;
  setGame: React.Dispatch<React.SetStateAction<Game | null>>;
  phaseCompleted: boolean;
  setPhaseCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<Game | null>(null);
  const [phaseCompleted, setPhaseCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { gameId, playerId, clearSession } = useSession();

  // Rejoin game if page is refreshed
  useEffect(() => {
    const tryRejoin = async () => {
      if (!gameId || !playerId) return;

      setLoading(true);
      try {
        const gameState = await fetchGameState(gameId);
        setGame(gameState);
        // TODO: ReconnectWebSocket
      } catch (err) {
        console.error('Failed to rejoin game:', err);
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    tryRejoin();
  }, [gameId, playerId]);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        phaseCompleted,
        setPhaseCompleted,
        loading,
      }}
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
