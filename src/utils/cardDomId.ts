import { TechnologyType } from '../types/TechnologyTypes';

/**
 * Unique DOM-ID of a handcard is its cardId
 */
export function getHandCardDomId(cardId: string): string {
  return cardId;
}

/**
 * Unique DOM-ID for a slot on the board.
 */
export function getBoardPositionDomId(
  type: TechnologyType | 'climate-action',
  index: number
): string {
  return `${type}-${index}`;
}
