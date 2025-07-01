import { createContext, useContext } from 'react';
import { SendMessageService } from '../services/SendMessageService';
import { useMockGameActionService } from '../services/MockSendMessageService';
import { useWebsocketSendMessageService } from '../services/WebSocketSendMessageService';

const SendMessageContext = createContext<SendMessageService | undefined>(undefined);

export const SendMessageProvider = ({
  children,
  useMock = false,
}: {
  children: React.ReactNode;
  useMock?: boolean;
}) => {
  const service = useMock ? useMockGameActionService() : useWebsocketSendMessageService();
  return <SendMessageContext.Provider value={service}>{children}</SendMessageContext.Provider>;
};

export const useSendMessage = (): SendMessageService => {
  const context = useContext(SendMessageContext);
  if (!context) {
    throw new Error('useSendMessage must be used within a SendMessageProvider');
  }
  return context;
};
