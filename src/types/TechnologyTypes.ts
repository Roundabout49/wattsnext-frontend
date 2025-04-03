interface TechnologyTypeInfo {
  label: string;
  color: string;
}

export const TechnologyTypes: Record<string, TechnologyTypeInfo> = {
  ClimateAction: { label: 'Klimaaktion', color: '#4CAF50' },
  Generation: { label: 'Erzeugung', color: '#2196F3' },
  Distribution: { label: 'Verteilung', color: '#9C27B0' },
  Storage: { label: 'Speicher', color: '#FF9800' },
} as const;

export type TechnologyType = keyof typeof TechnologyTypes;

// Example usage: const { label, color } = TechnologyTypes[type];
