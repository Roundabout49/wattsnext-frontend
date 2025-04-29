import { SvgIconComponent } from '@mui/icons-material';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';

interface EnergyTypeInfo {
  label: string;
  icon: SvgIconComponent;
}

export const EnergyTypes: Record<string, EnergyTypeInfo> = {
  Electricity: { label: 'Strom', icon: BoltOutlinedIcon },
  Heat: { label: 'Wärme', icon: ThermostatOutlinedIcon },
} as const;

export type EnergyType = keyof typeof EnergyTypes;

export const orderedEnergyTypes: EnergyType[] = ['Electricity', 'Heat'];
