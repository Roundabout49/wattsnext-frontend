import { ClimateActionCardProps, TechnologyCardProps } from '../types/ProgressCards';

export const climateActionCards: ClimateActionCardProps[] = [
  {
    title: 'CO2-Abscheidung',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Das von Kraftwerken ausgestoßene CO2 wird herausgefiltert. Dieses abgeschiedene CO2 kann als Rohstoff z.B. in der Chemie-Industrie dienen.',
    price: 2,
    resources: 0,
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },

    icon: 'CarbonCapture',
    type: 'climateAction',
  },
  {
    title: 'H2-betriebene Schiffe',
    image: '/images/klimaaktion.png',
    text: '',
    explanation:
      'Wasserstoff (H2) gilt als alternativer grüner Kraftstoff. Die Nutzung bietet sich vor allem auf langen Strecken an, da Batterien nicht die notwendige Reichweite bieten können.',
    price: 2,
    resources: 0,
    points: { basePoints: 0, systemPoints: 2, conditions: ['ChemicalEnergy'] },
    type: 'climateAction',
  },
  {
    title: 'Power-to-X',
    image: '/images/klimaaktion.png',
    text: 'Für ein gebautes Gaskraftwerk erhaltet ihr 5 zusätzliche Fortschrittspunkte.',
    explanation:
      'Power-to-X Technologien speichern Stromüberschüsse aus erneuerbaren Energien und wandeln sie in chemische Energieträger (z.B. H2) für Langfristspeicherung und Verkehr um.',
    price: 2,
    resources: 0,
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: [
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 3,
        },
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },
    icon: 'ChemicalEnergy',
    type: 'climateAction',
  },
];

export const generationCards: TechnologyCardProps[] = [
  {
    title: 'Photovoltaik auf dem Dach',
    image: '/images/photovoltaik.png',
    text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
    explanation: 'Photovoltaik generiert aus Sonnenlicht Strom.',
    points: { basePoints: 2, systemPoints: 5 },
    price: 1,
    resources: 1,
    energyCharacteristics: { technology: 'Generation', energy: 'Electricity', size: 1 },
    type: 'technology',
  },
];

export const distributionCards: TechnologyCardProps[] = [
  {
    title: 'Fernwärmenetz',
    image: '/images/fernwaerme.png',
    text: 'Diese Karte allein gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Das Fernwärmenetz transportiert zentral erzeugte Wärme oder Abwärme aus Fabriken oder Kraftwerken über mehrere Kilometer für die eigene Wärmeversorgung zu Hause.',
    price: 7,
    resources: 2,
    energyCharacteristics: { technology: 'Distribution', energy: 'Heat', size: 2 },
    type: 'technology',
  },
];

export const storageCards: TechnologyCardProps[] = [
  {
    title: 'Großer Wasserstoffspeicher',
    image: '/images/wasserstoffspeicher.png',
    text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
    explanation: 'Mit Hilfe von Wasserstoff kann Energie gespeichert werden.',
    points: {
      basePoints: 8,
      systemPoints: 13,
      conditions: [{ technology: 'Generation', energy: 'Electricity', size: 4 }],
    },
    price: 10,
    resources: 4,
    energyCharacteristics: { technology: 'Storage', energy: 'Electricity', size: 4 },
    type: 'technology',
  },
];
