export interface RecoverPossibleMessage {
  cardId: string;
  position: number;
}

export interface PlayCardMessage {
  cardId: string;
  position: number;
  recover: boolean;
}

export type OutgoingMessage = RecoverPossibleMessage | PlayCardMessage | null;
