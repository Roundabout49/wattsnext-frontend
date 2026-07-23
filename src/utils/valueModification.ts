import { ModifiableValue, Supply } from '../types/ProgressCards';

export interface ModificationBadgeInfo {
  /** Numeric direction of the change (whether the value went up or down). */
  direction: 'up' | 'down';
  /** Whether the change benefits the player. */
  favorable: boolean;
}

/** Cost values: a lower value is better for the player. */
export function costModification(
  value: ModifiableValue<number>
): ModificationBadgeInfo | undefined {
  if (value.originalValue === value.modifiedValue) return undefined;
  const up = value.modifiedValue > value.originalValue;
  return { direction: up ? 'up' : 'down', favorable: !up };
}

/** Supply size: a higher value is better for the player. */
export function supplyModification(
  value: ModifiableValue<Supply | undefined>
): ModificationBadgeInfo | undefined {
  const original = supplySize(value.originalValue);
  const modified = supplySize(value.modifiedValue);
  if (original === modified) return undefined;
  const up = modified > original;
  return { direction: up ? 'up' : 'down', favorable: up };
}

function supplySize(supply: Supply | undefined): number {
  return supply?.type === 'energy' ? supply.size : 0;
}
