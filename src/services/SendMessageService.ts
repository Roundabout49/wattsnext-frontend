import {
  PlayTechnologyCardActionRequest,
  PlayTechnologyCardActionIntentRequest,
  PlayClimateCardActionRequest,
} from '../ws/MessageTypes';

export interface SendMessageService {
  sendPlayTechnologyCardActionIntent: (data: PlayTechnologyCardActionIntentRequest) => void;
  sendPlayTechnologyCardAction: (data: PlayTechnologyCardActionRequest) => void;
  sendPlayClimateCardAction: (data: PlayClimateCardActionRequest) => void;
  sendEarnMoneyAction: () => void;
}
