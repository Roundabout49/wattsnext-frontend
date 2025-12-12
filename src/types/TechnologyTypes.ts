import { Shape } from '../components/icons/EnergyIcon';

interface TechnologyTypeInfo {
  label: string;
  color: string;
  shape: Shape;
}

export const TechnologyTypes: Record<string, TechnologyTypeInfo> = {
  Generation: { label: 'Erzeugung', color: '#A3D5FF', shape: 'pentagon' },
  Distribution: { label: 'Verteilung', color: '#FEA4AA', shape: 'star' },
  Storage: { label: 'Speicher', color: '#FDDAA1', shape: 'circle' },
} as const;

export type TechnologyType = keyof typeof TechnologyTypes;
// Example usage: const { label, color } = TechnologyTypes[type];

export const orderedTechnologyTypes: TechnologyType[] = ['Generation', 'Distribution', 'Storage'];
