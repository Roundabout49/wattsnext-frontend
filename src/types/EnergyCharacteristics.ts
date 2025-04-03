import { EnergyType } from './EnergyTypes';
import { TechnologyType } from './TechnologyTypes';

export interface EnergyCharacteristics {
  technology: TechnologyType;
  type?: EnergyType;
  size?: number;
}
