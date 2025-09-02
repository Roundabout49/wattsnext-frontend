import {
  PlayTechnologyCardActionRequest,
  PlayTechnologyCardActionIntentRequest,
} from '../ws/MessageTypes';
import { useWebSocket } from '../ws/WebSocketProvider';
import { SendMessageService } from './SendMessageService';

export function useWebsocketSendMessageService(): SendMessageService {
  const { sendMessage } = useWebSocket();

  return {
    sendPlayCardIntent: (data: PlayTechnologyCardActionIntentRequest) => {
      sendMessage('/app/playCardIntent', data);
    },

    sendPlayCard: (data: PlayTechnologyCardActionRequest) => {
      sendMessage('/app/playCard', data);
    },

    sendEarnMoney: () => {
      sendMessage('/app/earnMoney', null);
    },
  };
}
