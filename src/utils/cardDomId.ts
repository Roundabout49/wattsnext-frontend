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

/**
 * Unique DOM-ID for an event slot on the board, used as the flight target when
 * a drawn event card animates onto the board.
 */
export function getEventSlotDomId(index: number): string {
  return `event-slot-${index}`;
}

export function getCatastropheSlotDomId(): string {
  return 'catastrophe-slot';
}
