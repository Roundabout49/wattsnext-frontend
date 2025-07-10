import { GameState } from '../types/GameState';
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
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: ['ChemicalEnergy'],
    },
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
        'ChemicalEnergy',
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
    points: {
      basePoints: 2,
      systemPoints: 5,
      conditions: [{ technology: 'Storage', energy: 'Electricity', size: 1 }],
    },
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

export const exampleGameState: GameState = {
  players: [
    {
      id: 'player1',
      name: 'Bob',
      hand: [generationCards[0], climateActionCards[0], climateActionCards[1]],
    },
    {
      id: 'player2',
      name: 'Alice',
      hand: [climateActionCards[2], storageCards[0], distributionCards[0]],
    },
  ],
  currentPlayerId: 'player1',
  board: {
    climateActions: [
      climateActionCards[0],
      climateActionCards[1],
      climateActionCards[2],
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    generation: [generationCards[0], null, null],
    storage: [storageCards[0], null, null],
    distribution: [distributionCards[0], null, null],
    event: null,
    badEvent: null,
  },
  money: 5,
  resources: 13,
  progressPoints: 17,
  technologySizes: {
    Storage: { Electricity: 2, Heat: 0 },
    Generation: { Electricity: 4, Heat: 0 },
    Distribution: { Electricity: 3, Heat: 0 },
  },
  phase: 1,
  turn: 8,
  turnsInPhase: 12,
  phaseObjectives: {
    1: {
      objective: {
        progressPoints: 25,
        technologyTypes: {
          Generation: 3,
          Distribution: 3,
          Storage: 0,
        },
        energyTypes: ['Electricity', 'Heat'],
      },
    },
    2: {
      objective: {
        progressPoints: 50,
        technologyTypes: {
          Generation: 6,
          Distribution: 6,
          Storage: 3,
        },
        energyTypes: ['Electricity', 'Heat'],
      },
    },
    3: {
      objective: {
        progressPoints: 75,
        technologyTypes: {
          Generation: 9,
          Distribution: 9,
          Storage: 6,
        },
        energyTypes: ['Electricity', 'Heat'],
      },
    },
  },
  canSearchPile: false,
};
