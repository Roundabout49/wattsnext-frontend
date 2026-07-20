export interface EventCard {
  id: string;
  name: string;
  phaseIndex: number;
  isCatastrophe: boolean;
  eventDescription: string;
  effectDescriptions: EffectDescription[];
  effectConditionDescription?: string;
}

export interface EffectDescription {
  text: string;
  type: EffectType;
}

// Must stay in sync with the backend EffectType enum.
export type EffectType = 'MoneyAndResources' | 'Points' | 'EnergySystem';
