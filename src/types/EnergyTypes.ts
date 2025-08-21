import { SvgIconComponent } from '@mui/icons-material';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';

interface EnergyFormInfo {
  label: string;
  icon: SvgIconComponent;
}

export const EnergyForms: Record<string, EnergyFormInfo> = {
  Electricity: { label: 'Strom', icon: BoltOutlinedIcon },
  Heat: { label: 'Wärme', icon: ThermostatOutlinedIcon },
} as const;

export type EnergyForm = keyof typeof EnergyForms;

export const orderedEnergyForms: EnergyForm[] = ['Electricity', 'Heat'];
