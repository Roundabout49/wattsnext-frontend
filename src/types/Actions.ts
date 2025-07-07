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
}

export interface PlayCardActionState extends BaseActionState {
  type: 'playCard';
  step:
    | 'selectCard'
    | 'selectPosition'
    | 'waitIfRecoverPossible'
    | 'selectRecoverResources'
    | 'confirm'
    | 'waitForDone'
    | 'done';
  cardId: string | null;
  selectedPosition: number | null;
  recoverResources: boolean | null;
}

// TODO: Add properties

export interface EarnMoneyActionState extends BaseActionState {
  type: 'earnMoney';
  step: 'confirm' | 'waitForGameState' | 'done';
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
