import { SendMessageService } from './SendMessageService';

export function useMockGameActionService(): SendMessageService {
  return {
    sendPlayCardIntent: (cardId, position) => {
      console.log('[Mock] sendPlayCardIntent', { cardId, position });
      // TODO
    },
    sendPlayCard: (cardId, position, recoverResources) => {
      console.log('[Mock] sendPlayCard', { cardId, position, recoverResources });
      // TODO
    },
    sendEarnMoney: () => {
      console.log('[Mock] sendEarnMoney');
      // TODO
    },
  };
}
