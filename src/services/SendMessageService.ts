import {
  PlayTechnologyCardActionRequest,
  PlayTechnologyCardActionIntentRequest,
} from '../ws/MessageTypes';

export interface SendMessageService {
  sendPlayCardIntent: (data: PlayTechnologyCardActionIntentRequest) => void;
  sendPlayCard: (data: PlayTechnologyCardActionRequest) => void;
  sendEarnMoney: () => void; // Todo: playerId required?
}
