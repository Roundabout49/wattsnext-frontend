import { PlayCardMessage, RecoverPossibleMessage } from '../ws/MessageTypes';
import { useWebSocket } from '../ws/WebSocketProvider';
import { SendMessageService } from './SendMessageService';

export function useWebsocketSendMessageService(): SendMessageService {
  const { sendMessage } = useWebSocket();

  return {
    sendPlayCardIntent: (data: RecoverPossibleMessage) => {
      sendMessage('/app/playCardIntent', data);
    },

    sendPlayCard: (data: PlayCardMessage) => {
      sendMessage('/app/playCard', data);
    },

    sendEarnMoney: () => {
      sendMessage('/app/earnMoney', null);
    },
  };
}
