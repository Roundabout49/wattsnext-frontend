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
      sendMessage('app/game/playTechnologyCardIntent', data);
    },

    sendPlayTechnologyCardAction: (data: PlayTechnologyCardActionRequest) => {
      sendMessage('app/game/playTechnologyCard', data);
    },

    sendEarnMoneyAction: () => {
      sendMessage('app/game/earnMoney', null);
    },

    sendPlayClimateCardAction: (data: PlayClimateCardActionRequest) => {
      sendMessage('app/game/playClimateCard', data);
    },
  };
}
