import { useWebSocket } from '../ws/WebSocketProvider';
import { SendMessageService } from './SendMessageService';

export function useWebsocketSendMessageService(): SendMessageService {
  const { sendMessage } = useWebSocket();

  return {
    sendPlayCardIntent: (cardId: string, position: number) => {
      sendMessage('/app/playCardIntent', { cardId, position });
    },

    sendPlayCard: (cardId: string, position: number, recoverResources: boolean) => {
      sendMessage('/app/playCard', { cardId, position, recoverResources });
    },

    sendEarnMoney: () => {
      sendMessage('/app/earnMoney', {});
    },
  };
}
