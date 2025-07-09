import React, { createContext, useContext, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { OutgoingMessage } from './MessageTypes';
// import { useGame } from '../context/GameContext';
// import { useAction } from '../context/ActionContext';

const WebSocketContext = createContext<WebSocketContextType>({ sendMessage: () => {} });

type WebSocketContextType = {
  sendMessage: (destination: string, body: OutgoingMessage) => void;
};

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const clientRef = useRef<Client>(null);
  // const { setGameState } = useGame();
  // const { dispatchGameAction } = useAction();

  /*useEffect(() => {
    const client = new Client({
      // TODO: Replace with actual WebSocket URL
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      debug: (str) => console.log('[STOMP]', str),
    });

    client.onConnect = () => {
      console.log('Connected to WebSocket');
      // Beispiel: Backend sendet neuen GameState
      client.subscribe('/topic/gameState', (message: IMessage) => {
        const gameState = JSON.parse(message.body);
        // Weiterverarbeitung, z.B. Dispatch in GameContext (siehe unten)
        setGameState(gameState);
      });

      client.subscribe('/topic/earnMoneyResult', (message: IMessage) => {
        const result = JSON.parse(message.body);
        handleEarnMoneyResult(result, dispatchGameAction);
      });

      // TODO: Weitere Subscriptions für andere Nachrichten
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);*/

  const sendMessage = (destination: string, body: OutgoingMessage) => {
    clientRef.current?.publish({
      destination,
      body: JSON.stringify(body),
    });
  };

  return <WebSocketContext.Provider value={{ sendMessage }}>{children}</WebSocketContext.Provider>;
}

export const useWebSocket = () => useContext(WebSocketContext);
