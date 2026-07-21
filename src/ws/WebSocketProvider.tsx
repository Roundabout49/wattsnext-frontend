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
  ResultHandlerContext,
} from './MessageHandler';
import { useSession } from '../context/SessionContext';
import { useNotification } from '../context/NotificationContext';
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
  const { dispatchGameAction, setPendingPhaseCompleted, setPendingEvent, setPendingActionMessage } =
    useAction();
  const { gameId, playerId } = useSession();
  const { notify } = useNotification();

  useEffect(() => {
    if (!gameId || !playerId) return;

    const handlerContext: ResultHandlerContext = {
      dispatch: dispatchGameAction,
      setPendingPhaseCompleted,
      setPendingEvent,
      setPendingActionMessage,
      notify,
      playerId,
    };

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

      const gameTopic = `/topic/game/${gameId}`;

      client.subscribe(gameTopic, (message: IMessage) => {
        setGame(JSON.parse(message.body));
      });

      client.subscribe(`${gameTopic}/earnMoneyResult`, (message: IMessage) =>
        handleEarnMoneyResult(JSON.parse(message.body), handlerContext)
      );
      client.subscribe(`${gameTopic}/playTechnologyCardIntentResult`, (message: IMessage) =>
        handlePlayTechnologyCardIntentResult(JSON.parse(message.body), handlerContext)
      );
      client.subscribe(`${gameTopic}/playTechnologyCardResult`, (message: IMessage) =>
        handlePlayTechnologyCardResult(JSON.parse(message.body), handlerContext)
      );
      client.subscribe(`${gameTopic}/playClimateCardResult`, (message: IMessage) =>
        handlePlayClimateCardResult(JSON.parse(message.body), handlerContext)
      );
      client.subscribe(`${gameTopic}/changeCardResult`, (message: IMessage) =>
        handleChangeCardResult(JSON.parse(message.body), handlerContext)
      );
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
