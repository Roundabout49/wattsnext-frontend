import { SvgIconComponent } from '@mui/icons-material';
import { EnergyCharacteristics } from './EnergyCharacteristics';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';

export interface ProgressCardProps {
  title: string;
  image: string;
  text: string;
  explanation: string;
  basePoints?: number;
  systemPoints?: number;
  conditions?: (EnergyCharacteristics | Icon)[];
  price: number;
  resources: number;
  type: 'technology' | 'climateAction';
}

export interface TechnologyCardProps extends ProgressCardProps {
  energyCharacteristics: EnergyCharacteristics;
  type: 'technology';
}

export interface ClimateActionCardProps extends ProgressCardProps {
  icon?: string;
  type: 'climateAction';
}

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
