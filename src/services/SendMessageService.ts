export interface SendMessageService {
  sendPlayCardIntent: (cardId: string, position: number) => void;
  sendPlayCard: (cardId: string, position: number, recoverResources: boolean) => void;
  sendEarnMoney: () => void;
}
