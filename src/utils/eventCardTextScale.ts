import { EventCard } from '../types/EventCards';

export interface EventCardTextScale {
  bodyFontSize?: string;
  effectIconSize: number;
  rowSpacing: number;
}

const totalEffectTextLength = (card: EventCard): number =>
  (card.effectConditionDescription?.length ?? 0) +
  card.effectDescriptions.reduce((sum, effect) => sum + effect.text.length, 0);

// Character-count tiers, same idea as the progress cards' length-based font shrink
// (see ProgressCardLarge.tsx), but keyed on the combined condition + effects text
// since a card can have a short description and still overflow on its effects.
export function eventCardTextScale(card: EventCard, includeDescription: boolean): EventCardTextScale {
  const length = totalEffectTextLength(card) + (includeDescription ? card.eventDescription.length : 0);

  if (includeDescription) {
    if (length > 380) return { bodyFontSize: '0.68rem', effectIconSize: 26, rowSpacing: 0.5 };
    if (length > 300) return { bodyFontSize: '0.76rem', effectIconSize: 30, rowSpacing: 0.75 };
    if (length > 220) return { bodyFontSize: '0.82rem', effectIconSize: 32, rowSpacing: 0.75 };
    return { bodyFontSize: undefined, effectIconSize: 34, rowSpacing: 1 };
  }

  if (length > 220) return { bodyFontSize: '0.72rem', effectIconSize: 26, rowSpacing: 0.5 };
  if (length >= 150) return { bodyFontSize: '0.8rem', effectIconSize: 30, rowSpacing: 0.75 };
  return { bodyFontSize: undefined, effectIconSize: 34, rowSpacing: 1 };
}

// Small card only: the large card's name never got long enough to need shrinking.
export function eventCardNameFontSize(card: EventCard): string {
  return card.name.length >= 20 ? '0.95rem' : '1.25rem';
}
