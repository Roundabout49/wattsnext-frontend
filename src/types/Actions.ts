import { Game } from './Game';

export type ActionKind =
  | 'playCard'
  | 'earnMoney'
  | 'changeCard' /*| 'discardCards' | 'searchDeck'*/
  | null;

// Every turn contains exactly one of these action kinds
export const realActionKinds: Exclude<Exclude<ActionKind, null>, 'changeCard'>[] = [
  'playCard',
  'earnMoney',
  /*'discardCards',
  'searchDeck',*/
];

interface BaseActionState {
  type: ActionKind;
  step: string;
  newGameState: Game | null;
  finishRequested?: boolean;
}

export interface PlayCardActionState extends BaseActionState {
  type: 'playCard';
  step:
    | 'selectCard'
    | 'selectPosition'
    | 'waitIfRecoverPossible'
    | 'selectRecoverResources'
    | 'confirm'
    | 'waitForGameState'
    | 'animatePlayCard'
    | 'done';
  cardId: string | null;
  cardType: 'technology' | 'climateAction' | null;
  selectedPosition: number | null;
  recoverResources: boolean | null;
  moneyChange: number | null;
  resourceChange: number | null;
}

export interface EarnMoneyActionState extends BaseActionState {
  type: 'earnMoney';
  step: 'confirm' | 'waitForGameState' | 'animateDie' | 'done';
  amount: number | null;
}

export interface ChangeCardActionState extends BaseActionState {
  type: 'changeCard';
  step: 'selectCard' | 'confirm' | 'waitForGameState' | 'animateChangeCard' | 'done';
  cardId: string | null;
}

/*export interface DiscardCardsActionState extends BaseActionState {
  type: 'discardCards';
}

export interface SearchDeckActionState extends BaseActionState {
  type: 'searchDeck';
}*/

export type ActionState = PlayCardActionState | EarnMoneyActionState | ChangeCardActionState;
/*| DiscardCardsActionState
  | SearchDeckActionState;*/

// Type-level check to ensure that all ActionStates have a 'done' step
type MustHaveDoneStep<T extends { step: string }> = 'done' extends T['step'] ? T : never;
export const _typecheck = null as unknown as MustHaveDoneStep<ActionState>;
