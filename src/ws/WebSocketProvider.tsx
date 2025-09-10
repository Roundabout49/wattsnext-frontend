import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { OutgoingMessage } from './MessageTypes';
import { useGame } from '../context/GameContext';
import { useAction } from '../context/ActionContext';
import {
  handleEarnMoneyResult,
  handlePlayTechnologyCardIntentResult,
  handlePlayTechnologyCardResult,
} from './MessageHandler';
import { useSession } from '../context/SessionContext';

const WebSocketContext = createContext<WebSocketContextType>({
  sendMessage: () => {},
  connected: false,
});

type WebSocketContextType = {
  sendMessage: (destination: string, body: OutgoingMessage | null) => void;
  connected: boolean;
};

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const clientRef = useRef<Client>(null);
  const [connected, setConnected] = useState(false);
  const { setGame } = useGame();
  const { dispatchGameAction } = useAction();
  const { gameId, playerId } = useSession();

  useEffect(() => {
    if (!gameId || !playerId) return;

    const client = new Client({
      // TODO: Replace with actual WebSocket URL
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      debug: (str) => console.log('[STOMP]', str),
      connectHeaders: {
        gameId: gameId,
        playerId: playerId,
      },
    });

    client.onConnect = () => {
      console.log('Connected to WebSocket');
      setConnected(true);

      client.subscribe(`/topic/game/${gameId}`, (message: IMessage) => {
        const gameState = JSON.parse(message.body);
        setGame(gameState);
      });

      client.subscribe(`/topic/game/${gameId}/earnMoneyResult`, (message: IMessage) => {
        const result = JSON.parse(message.body);
        handleEarnMoneyResult(result, dispatchGameAction);
      });
      client.subscribe(`/topic/game/${gameId}/playCardIntentResult`, (message: IMessage) => {
        const result = JSON.parse(message.body);
        handlePlayTechnologyCardIntentResult(result, dispatchGameAction);
      });
      client.subscribe(`/topic/game/${gameId}/playCardResult`, (message: IMessage) => {
        const result = JSON.parse(message.body);
        handlePlayTechnologyCardResult(result, dispatchGameAction);
      });
    };

    client.onStompError = (frame) => {
      console.error('STOMP error:', frame);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      setConnected(false);
    };
  }, [gameId, playerId]);

  const sendMessage = (destination: string, body: OutgoingMessage | null) => {
    clientRef.current?.publish({
      destination,
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, connected }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = () => useContext(WebSocketContext);
