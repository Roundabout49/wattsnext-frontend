import { SvgIconComponent } from '@mui/icons-material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import { TechnologyType } from './TechnologyTypes';
import { EnergyForm } from './EnergyTypes';

export interface IProgressCard {
  name: string;
  image: string;
  text: string;
  explanation: string;
  moneyCosts: ModifiableValue<number>;
  resourceCosts: ModifiableValue<number>;
  points?: ModifiableValue<ProgressPoints>;
  supply?: ModifiableValue<Supply>;
  type: 'technology' | 'climateAction';
}

interface ModifiableValue<T> {
  originalValue: T;
  modifiedValue?: T;
  modifications: Modification[];
}

type Modification = { type: 'Stack'; multiplier: number } | { type: 'Card'; name: string };

export interface TechnologyCard extends IProgressCard {
  supply: ModifiableValue<Extract<Supply, { type: 'energy' }>>;
  // TODO: Multiplier
  type: 'technology';
}

export interface ClimateActionCard extends IProgressCard {
  supply?: ModifiableValue<Extract<Supply, { type: 'icon' }>>;
  // TODO: effect
  type: 'climateAction';
}

export type ProgressCard = TechnologyCard | ClimateActionCard;

interface IconInfo {
  label: string;
  icon: SvgIconComponent;
}

export const Icons: Record<string, IconInfo> = {
  CarbonCapture: { label: 'Carbon Capture', icon: SystemUpdateAltIcon },
  NuclearWasteRepository: { label: 'Nuclear Waste Repository', icon: DeleteForeverIcon },
  ChemicalEnergy: { label: 'Chemical Energy', icon: HubOutlinedIcon },
} as const;

export type Icon = keyof typeof Icons;

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
      fulfilled: boolean | null;
    }
  | {
      type: 'icon';
      iconName: Icon;
      fulfilled: boolean | null;
    }
  | {
      type: 'never';
      fulfilled: false;
    };

export function isIcon(condition: Supply): condition is Extract<Supply, { type: 'icon' }> {
  return condition.type === 'icon';
}
