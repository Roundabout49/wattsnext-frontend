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
      sendMessage('/game/playTechnologyCardIntent', data);
    },

    sendPlayTechnologyCardAction: (data: PlayTechnologyCardActionRequest) => {
      sendMessage('/game/playTechnologyCard', data);
    },

    sendEarnMoneyAction: () => {
      sendMessage('/game/earnMoney', null);
    },

    sendPlayClimateCardAction: (data: PlayClimateCardActionRequest) => {
      sendMessage('/game/playClimateCard', data);
    },
  };
}
