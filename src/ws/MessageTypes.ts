import { Game } from '../types/Game';
import { ClimateActionCard, ProgressCard, TechnologyCard } from '../types/ProgressCards';

export interface PlayTechnologyCardActionIntentRequest {
  progressCardId: string;
  targetPosition: number;
}

export interface PlayTechnologyCardActionRequest {
  shallRecycle: boolean;
}

export interface PlayClimateCardActionRequest {
  climateCardId: string;
}

export interface ChangeCardActionRequest {
  progressCardId: string;
}

export interface AnswerQuizActionRequest {
  optionIndex: number;
}

export interface ActionResponse<T> {
  game: Game;
  status: ResponseStatus;
  actionInfo?: T;
  baseInfo?: BaseInfo;
  cardEffectInfo?: CardEffectInformation[];
  eventEffectInfo?: CardEffectInformation[];
}

export enum ResponseStatus {
  Ok = 'Ok',
  IllegalActionArguments = 'IllegalActionArguments',
  IllegalAction = 'IllegalAction',
}

export interface BaseInfo {
  phaseCompleted: boolean;
  gotNewStandardEventCard: boolean;
  gotNewQuiz: boolean;
  hasGameStateChanged: boolean;
  requirementsFulfilled?: boolean;
}

export type CardEffectInformation =
  | { type: 'Money'; amount: number }
  | { type: 'Resources'; amount: number }
  | { type: 'ProgressPoints'; amount: number }
  | { type: 'GenerationAndDistributionTargets'; amount: number }
  | { type: 'NuclearCatastrophe' };

export interface EarnMoneyActionInformation {
  diceValue: number;
}

export interface PlayTechnologyCardActionIntentInformation {
  canRecycle: boolean;
  moneyForRecycling?: number;
  gainingResourcesForRecycling?: number;
  moneyForPlayingCard: number;
  resourcesForPlayingCard: number;
}

export interface PlayTechnologyCardActionInformation {
  playedCard: TechnologyCard;
  targetPosition: number;
  drawnCard: ProgressCard;
  payedMoneyForCard: number;
  payedResourcesForCard: number;
  didRecycle: boolean;
  payedMoneyForRecycling?: number;
  gainedResourcesForRecycling?: number;
}

export interface PlayClimateCardActionInformation {
  playedCard: ClimateActionCard;
  drawnCard: ProgressCard;
}

export interface ChangeCardActionInformation {
  discardedCard: ProgressCard;
  drawnCard: ProgressCard;
}

export interface AnswerQuizActionInformation {
  chosenIndex: number;
  correctIndex: number;
  wasCorrect: boolean;
  moneyDelta: number;
  explanation: string;
}

export type OutgoingMessage =
  | PlayTechnologyCardActionIntentRequest
  | PlayTechnologyCardActionRequest
  | PlayClimateCardActionRequest
  | ChangeCardActionRequest
  | AnswerQuizActionRequest
  | null;
