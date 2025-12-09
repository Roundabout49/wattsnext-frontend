import { SvgIconComponent } from '@mui/icons-material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import { TechnologyType } from './TechnologyTypes';
import { EnergyForm } from './EnergyForms';
import { GameState } from './Game';

export interface IProgressCard {
  id: string;
  name: string;
  image: string;
  text: string;
  explanation: string;
  moneyCosts: ModifiableValue<number>;
  resourceCosts: ModifiableValue<number>;
  points?: ModifiableValue<ProgressPoints>;
  supply: ModifiableValue<Supply | undefined>;
  isPlayable: boolean;
  gameBeforeEffect?: GameState;
  type: 'technology' | 'climateAction';
}

export interface ModifiableValue<T> {
  originalValue: T;
  modifiedValue: T;
  modifications: Modification[];
}

export type Modification = { type: 'Stack'; multiplier: number } | { type: 'Card'; name: string };

export interface TechnologyCard extends IProgressCard {
  supply: ModifiableValue<Extract<Supply, { type: 'energy' }>>;
  type: 'technology';
}

export interface ClimateActionCard extends IProgressCard {
  supply: ModifiableValue<Extract<Supply, { type: 'achievement' }> | undefined>;
  type: 'climateAction';
}

export type ProgressCard = TechnologyCard | ClimateActionCard;

interface AchievementInfo {
  label: string;
  icon: SvgIconComponent;
}

export const Achievements: Record<string, AchievementInfo> = {
  CarbonCapture: { label: 'CarbonCapture', icon: SystemUpdateAltIcon },
  NuclearWasteRepository: { label: 'NuclearWasteRepository', icon: DeleteForeverIcon },
  ChemicalEnergy: { label: 'ChemicalEnergy', icon: HubOutlinedIcon },
} as const;

export type Achievement = keyof typeof Achievements;

export interface ProgressPoints {
  baseProgressPoints?: number;
  systemProgressPoints: number;
  conditions: Supply[];
  conditionsFulfilled: boolean;
}

export type Supply =
  | {
      type: 'energy';
      technology: TechnologyType;
      form: EnergyForm;
      size: number;
      fulfilled?: boolean | null;
    }
  | {
      type: 'achievement';
      name: Achievement;
      fulfilled?: boolean | null;
    }
  | {
      type: 'never';
      fulfilled: false;
    };

export function isAchievement(
  condition: Supply
): condition is Extract<Supply, { type: 'achievement' }> {
  return condition.type === 'achievement';
}

export function isEnergy(condition: Supply): condition is Extract<Supply, { type: 'energy' }> {
  return condition.type === 'energy';
}
