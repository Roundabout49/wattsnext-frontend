import { SvgIconComponent } from '@mui/icons-material';
import { EnergyCharacteristics } from './EnergyCharacteristics';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';

export interface IProgressCardProps {
  title: string;
  image: string;
  text: string;
  explanation: string;
  points?: Points;
  price: number;
  resources: number;
  type: 'technology' | 'climateAction';
}

export interface TechnologyCardProps extends IProgressCardProps {
  energyCharacteristics: EnergyCharacteristics;
  // TODO: Multiplier
  type: 'technology';
}

export interface ClimateActionCardProps extends IProgressCardProps {
  icon?: string;
  // TODO: effect
  type: 'climateAction';
}

export type ProgressCardProps = TechnologyCardProps | ClimateActionCardProps;

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

export interface Points {
  basePoints?: number;
  systemPoints: number;
  conditions?: (EnergyCharacteristics | Icon)[];
}

export function isIcon(condition: EnergyCharacteristics | Icon): condition is Icon {
  return typeof condition === 'string' && condition in Icons;
}
