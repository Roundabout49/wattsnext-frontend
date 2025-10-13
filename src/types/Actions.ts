import { Game } from './Game';

export type ActionKind = 'playCard' | 'earnMoney' /*| 'discardCards' | 'searchDeck'*/ | null;

export const actionKinds: Exclude<ActionKind, null>[] = [
  'playCard',
  'earnMoney',
  /*'discardCards',
  'searchDeck',*/
];

interface BaseActionState {
  type: ActionKind;
  step: string;
  newGameState: Game | null;
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

/*export interface DiscardCardsActionState extends BaseActionState {
  type: 'discardCards';
}

export interface SearchDeckActionState extends BaseActionState {
  type: 'searchDeck';
}*/

export type ActionState = PlayCardActionState | EarnMoneyActionState;
/*| DiscardCardsActionState
  | SearchDeckActionState;*/
