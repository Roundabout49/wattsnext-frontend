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
  progressCardId: string;
}

export interface ActionResponse<T> {
  game: Game;
  status: ResponseStatus;
  actionInformation?: T;
  // TODO: Also baseInformation and cardEffectInformations
}

// TODO: small letters
export enum ResponseStatus {
  OK = 'OK',
  ILLEGAL_ACTION_ARGUMENTS = 'ILLEGAL_ACTION_ARGUMENTS',
  ILLEGAL_ACTION = 'ILLEGAL_ACTION',
}

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
  cardEffectInformations: CardEffectInformation[];
}

export type CardEffectInformation =
  | { type: 'Money'; amount: number }
  | { type: 'Resource'; amount: number };

export type OutgoingMessage =
  | PlayTechnologyCardActionIntentRequest
  | PlayTechnologyCardActionRequest
  | PlayClimateCardActionRequest
  | null;
