import { Shape } from '../components/EnergyIcon';

interface TechnologyTypeInfo {
  label: string;
  color: string;
  shape: Shape;
}

export const TechnologyTypes: Record<string, TechnologyTypeInfo> = {
  Generation: { label: 'Erzeugung', color: '#2196F3', shape: 'pentagon' },
  Distribution: { label: 'Verteilung', color: '#F1407C', shape: 'star' },
  Storage: { label: 'Speicher', color: '#FFB800', shape: 'circle' },
} as const;

export type TechnologyType = keyof typeof TechnologyTypes;
// Example usage: const { label, color } = TechnologyTypes[type];

export const orderedTechnologyTypes: TechnologyType[] = ['Generation', 'Distribution', 'Storage'];
