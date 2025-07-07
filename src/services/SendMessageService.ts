import { PlayCardMessage, RecoverPossibleMessage } from '../ws/MessageTypes';

export interface SendMessageService {
  sendPlayCardIntent: (data: RecoverPossibleMessage) => void;
  sendPlayCard: (data: PlayCardMessage) => void;
  sendEarnMoney: () => void;
}
