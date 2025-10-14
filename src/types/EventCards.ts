import { SvgIconComponent } from '@mui/icons-material';

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

export const EffectTypes: Record<string, SvgIconComponent | null> = {
  MoneyAndResources: null,
  Points: null,
  EnergySystem: null,
} as const;

export type EffectType = keyof typeof EffectTypes;
