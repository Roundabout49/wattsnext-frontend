import {
  PlayTechnologyCardActionRequest,
  PlayTechnologyCardActionIntentRequest,
  PlayClimateCardActionRequest,
  ChangeCardActionRequest,
  AnswerQuizActionRequest,
} from '../ws/MessageTypes';

export interface SendMessageService {
  sendPlayTechnologyCardActionIntent: (data: PlayTechnologyCardActionIntentRequest) => void;
  sendPlayTechnologyCardAction: (data: PlayTechnologyCardActionRequest) => void;
  sendPlayClimateCardAction: (data: PlayClimateCardActionRequest) => void;
  sendEarnMoneyAction: () => void;
  sendChangeCardAction: (data: ChangeCardActionRequest) => void;
  sendAnswerQuizAction: (data: AnswerQuizActionRequest) => void;
}
