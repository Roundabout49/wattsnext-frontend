import {
  PlayTechnologyCardActionRequest,
  PlayTechnologyCardActionIntentRequest,
  PlayClimateCardActionRequest,
} from '../ws/MessageTypes';
import { useWebSocket } from '../ws/WebSocketProvider';
import { SendMessageService } from './SendMessageService';

export function useWebsocketSendMessageService(): SendMessageService {
  const { sendMessage } = useWebSocket();

  return {
    sendPlayTechnologyCardActionIntent: (data: PlayTechnologyCardActionIntentRequest) => {
      sendMessage('/app/playCardIntent', data);
    },

    sendPlayTechnologyCardAction: (data: PlayTechnologyCardActionRequest) => {
      sendMessage('/app/playCard', data);
    },

    sendEarnMoneyAction: () => {
      sendMessage('/app/earnMoney', null);
    },

    sendPlayClimateCardAction: (data: PlayClimateCardActionRequest) => {
      sendMessage('/app/playClimateCard', data);
    },
  };
}
