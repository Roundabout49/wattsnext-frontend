import { PlayCardMessage, PlayCardIntentMessage } from '../ws/MessageTypes';

export interface SendMessageService {
  sendPlayCardIntent: (data: PlayCardIntentMessage) => void;
  sendPlayCard: (data: PlayCardMessage) => void;
  sendEarnMoney: () => void; // Todo: playerId required?
}
