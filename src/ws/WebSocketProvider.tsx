import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { OutgoingMessage } from './MessageTypes';
import { useGame } from '../context/GameContext';
import { useAction } from '../context/ActionContext';
import {
  handleChangeCardResult,
  handleEarnMoneyResult,
  handlePlayClimateCardResult,
  handlePlayTechnologyCardIntentResult,
  handlePlayTechnologyCardResult,
} from './MessageHandler';
import { useSession } from '../context/SessionContext';
import { API_BROKER_URL } from '../base';

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
  const { dispatchGameAction, setPendingPhaseCompleted } = useAction();
  const { gameId, playerId } = useSession();

  useEffect(() => {
    if (!gameId || !playerId) return;

    const client = new Client({
      brokerURL: API_BROKER_URL,
      reconnectDelay: 5000,
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
        handleEarnMoneyResult(result, dispatchGameAction, setPendingPhaseCompleted);
      });
      client.subscribe(
        `/topic/game/${gameId}/playTechnologyCardIntentResult`,
        (message: IMessage) => {
          const result = JSON.parse(message.body);
          handlePlayTechnologyCardIntentResult(
            result,
            dispatchGameAction,
            setPendingPhaseCompleted
          );
        }
      );
      client.subscribe(`/topic/game/${gameId}/playTechnologyCardResult`, (message: IMessage) => {
        const result = JSON.parse(message.body);
        handlePlayTechnologyCardResult(result, dispatchGameAction, setPendingPhaseCompleted);
      });
      client.subscribe(`/topic/game/${gameId}/playClimateCardResult`, (message: IMessage) => {
        const result = JSON.parse(message.body);
        handlePlayClimateCardResult(result, dispatchGameAction, setPendingPhaseCompleted);
      });
      client.subscribe(`/topic/game/${gameId}/changeCardResult`, (message: IMessage) => {
        const result = JSON.parse(message.body);
        handleChangeCardResult(result, dispatchGameAction, setPendingPhaseCompleted);
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
