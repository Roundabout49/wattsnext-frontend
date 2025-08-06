import { ProgressCardProps } from '../types/ProgressCards';

export const cards: Record<string, ProgressCardProps> = {
  Kohlekraftwerk: {
    title: 'Kohlekraftwerk',
    image: '',
    text: 'Strom und Wärme müssen verteilt werden. CO2 muss aus dem Abgas entfernt werden.',
    explanation: 'Verbrennung von Kohle erzeugt Strom und die Abwärme ist nutzbar für Fernwärme.',
    price: 8,
    resources: 5,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 0,
      systemPoints: 1,
      conditions: [
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 4,
        },
        {
          technology: 'Distribution',
          energy: 'Heat',
          size: 2,
        },
        'CarbonCapture',
      ],
    },
  },
  'Photovoltaik auf dem Dach': {
    title: 'Photovoltaik auf dem Dach',
    image: '/images/photovoltaik.png',
    text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
    explanation: 'Photovoltaik generiert aus Sonnenlicht Strom.',
    price: 1,
    resources: 1,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      basePoints: 3,
      systemPoints: 6,
      conditions: [
        {
          technology: 'Storage',
          energy: 'Electricity',
          size: 1,
        },
      ],
    },
  },
  'Balkon-Photovoltaik': {
    title: 'Balkon-Photovoltaik',
    image: '',
    text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
    explanation:
      'Eine kleine Photovoltaikanalage auf deinem Balkon generiert aus Sonnenlicht Strom.',
    price: 1,
    resources: 1,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      basePoints: 3,
      systemPoints: 6,
      conditions: [
        {
          technology: 'Storage',
          energy: 'Electricity',
          size: 1,
        },
      ],
    },
  },
  'Solarthermie-Anlage auf Dach': {
    title: 'Solarthermie-Anlage auf Dach',
    image: '',
    text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Wärme gespeichert werden.',
    explanation:
      'Solarthermieanlagen erzeugen aus Sonnenenergie warmes Wasser für deine Dusche und Heizung.',
    price: 1,
    resources: 1,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Heat',
      size: 1,
    },
    points: {
      basePoints: 2,
      systemPoints: 5,
      conditions: [
        {
          technology: 'Storage',
          energy: 'Heat',
          size: 1,
        },
      ],
    },
  },
  Ölheizung: {
    title: 'Ölheizung',
    image: '',
    text: '',
    explanation: 'Eine Erdölheizung erzeugt durch Ölverbrennung Wärme für deine Heizung.',
    price: 2,
    resources: 2,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Heat',
      size: 1,
    },
    points: {
      basePoints: 0,
      systemPoints: 1,
      conditions: [],
    },
  },
  Erdwärmeheizung: {
    title: 'Erdwärmeheizung',
    image: '',
    text: 'Um das volle Potenzial nutzen zu können, muss Wärme gespeichert werden.',
    explanation: 'Die Wärme aus dem Erdboden wird für deine Heizung genutzt.',
    price: 2,
    resources: 1,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Heat',
      size: 1,
    },
    points: {
      basePoints: 2,
      systemPoints: 6,
      conditions: [
        {
          technology: 'Storage',
          energy: 'Heat',
          size: 1,
        },
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 1,
        },
      ],
    },
  },
  'Kleiner Windpark': {
    title: 'Kleiner Windpark',
    image: '',
    text: 'Der Strom muss verteilt werden. In windreichen Stunden muss Strom gespeichert werden.',
    explanation: 'Windkraftanlagen nutzen den Wind um daraus Strom zu erzeugen.',
    price: 2,
    resources: 2,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 2,
    },
    points: {
      basePoints: 6,
      systemPoints: 11,
      conditions: [
        {
          technology: 'Storage',
          energy: 'Electricity',
          size: 2,
        },
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 2,
        },
      ],
    },
  },
  'Großer Photovoltaik-Park': {
    title: 'Großer Photovoltaik-Park',
    image: '',
    text: 'Der Strom muss verteilt werden. In sonnenreichen Stunden muss Strom gespeichert werden.',
    explanation: 'Mit Sonnenlicht wird im großen Maße Strom erzeugt.',
    price: 2,
    resources: 2,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 2,
    },
    points: {
      basePoints: 6,
      systemPoints: 11,
      conditions: [
        {
          technology: 'Storage',
          energy: 'Electricity',
          size: 2,
        },
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 2,
        },
      ],
    },
  },
  Gaskraftwerk: {
    title: 'Gaskraftwerk',
    image: '',
    text: 'Strom und Wärme müssen verteilt werden. CO2 muss aus dem Abgas entfernt werden.',
    explanation:
      'Durch das Verbrennen von Gas kann Stromerzeugt werden, die Abwärme kann für Fernwärme genutzt werden.',
    price: 6,
    resources: 4,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 0,
      systemPoints: 1,
      conditions: [
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 3,
        },
        {
          technology: 'Distribution',
          energy: 'Heat',
          size: 2,
        },
        'CarbonCapture',
      ],
    },
  },
  'Großer Windpark': {
    title: 'Großer Windpark',
    image: '',
    text: 'Der Strom muss verteilt werden. In windreichen Stunden muss Strom gespeichert werden.',
    explanation: 'Viele Windkraftanalgen erzeugen aus Wind im großen Maße Strom.',
    price: 3,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 9,
      systemPoints: 16,
      conditions: [
        {
          technology: 'Storage',
          energy: 'Electricity',
          size: 3,
        },
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },
  },
  Geothermieheizwerk: {
    title: 'Geothermieheizwerk',
    image: '',
    text: 'Die Wärme muss  verteilt werden.',
    explanation: 'Durch Geothermie kann Erdwärme genutzt und ins Fernwärmenetz eingespeist werden.',
    price: 4,
    resources: 2,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Heat',
      size: 2,
    },
    points: {
      basePoints: 5,
      systemPoints: 14,
      conditions: [
        {
          technology: 'Distribution',
          energy: 'Heat',
          size: 2,
        },
      ],
    },
  },
  Atomkraftwerk: {
    title: 'Atomkraftwerk',
    image: '',
    text: 'Strom muss verteilt und ein Endlager für radioaktiven Abfall gefunden werden.',
    explanation: 'Durch Spaltung von Uran wird Strom und Wärme erzeugt.',
    price: 10,
    resources: 5,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 10,
      systemPoints: 18,
      conditions: [
        'NuclearWasteRepository',
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 4,
        },
      ],
    },
  },
  Laufwasserkraftwerk: {
    title: 'Laufwasserkraftwerk',
    image: '',
    text: 'Der Strom muss verteilt werden.',
    explanation: 'Durch die Flussströmung kann Strom erzeugt werden.',
    price: 4,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 9,
      systemPoints: 16,
      conditions: [
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },
  },
  'Offshore Windpark': {
    title: 'Offshore Windpark',
    image: '',
    text: 'Der Strom muss verteilt werden. In windreichen Stunden muss Strom gespeichert werden.',
    explanation: 'Viele Windkraftanalgen erzeugen aus Wind vor der Küste Strom.',
    price: 7,
    resources: 4,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 12,
      systemPoints: 21,
      conditions: [
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 4,
        },
        {
          technology: 'Storage',
          energy: 'Electricity',
          size: 4,
        },
      ],
    },
  },
  'Luft-Wärmepumpe': {
    title: 'Luft-Wärmepumpe',
    image: '',
    text: 'Für den Betrieb der Wärmepumpe wird Strom benötigt.',
    explanation: 'Luft-Wärmepumpe: Nutzt Strom um mit der Umgebungstemperatur zu heizen.',
    price: 2,
    resources: 1,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Heat',
      size: 1,
    },
    points: {
      basePoints: 2,
      systemPoints: 6,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 1,
        },
      ],
    },
  },
  Eisenkraftwerk: {
    title: 'Eisenkraftwerk',
    image: '',
    text: 'Bau auf Kohlekraftwerk: Zahle nur 4 Geldeinheiten und 1 Ressource. Strom und Wärme müssen verteilt werden.',
    explanation:
      'Strom und Abwärme werden durch Verbrennung von Eisen erzeugt. Dafür kann ein Kohlekraftwerk umgerüstet werden.',
    price: 9,
    resources: 4,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 10,
      systemPoints: 18,
      conditions: [
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 4,
        },
        {
          technology: 'Distribution',
          energy: 'Heat',
          size: 2,
        },
      ],
    },
  },
  Biomassekraftwerk: {
    title: 'Biomassekraftwerk',
    image: '',
    text: 'Strom und Wärme müssen verteilt werden.',
    explanation: 'Strom wird durch die Verbrennung von Biomasse, z.B. Altholz, erzeugt.',
    price: 7,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 9,
      systemPoints: 16,
      conditions: [
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 3,
        },
        {
          technology: 'Distribution',
          energy: 'Heat',
          size: 1,
        },
      ],
    },
  },
  'Erdkabel für kommunale Verteilung': {
    title: 'Erdkabel für kommunale Verteilung',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Vergleichen wir das Strom- mit dem Straßennetz, so entspricht dieses Erdkabel den Straßen innerhalb eines Ortes. Es transportiert den Strom unterirdisch zu den Haushalten.',
    price: 1,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      basePoints: 0,
      systemPoints: 0,
      conditions: [],
    },
  },
  'Erdkabel für regionale Verteilung': {
    title: 'Erdkabel für regionale Verteilung',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Vergleichen wir das Strom- mit dem Straßennetz, so entspricht dieses Erdkabel den Landstraßen.  Es transportiert den Strom unterirdisch innerhalb einer Region.',
    price: 1,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 2,
    },
    points: {
      basePoints: 0,
      systemPoints: 0,
      conditions: [],
    },
  },
  'Freileitungen für überregionale Verteilung': {
    title: 'Freileitungen für überregionale Verteilung',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Vergleichen wir das Strom- mit dem Straßennetz, so entspricht diese Freileitung den Bundesstraßen. Sie transportiert den  Strom überirdisch zwischen Regionen.',
    price: 2,
    resources: 1,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 0,
      systemPoints: 0,
      conditions: [],
    },
  },
  'Erdkabel für Stromübertragung auf weiten Strecken': {
    title: 'Erdkabel für Stromübertragung auf weiten Strecken',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Vergleichen wir das Strom- mit dem Straßennetz, so entspricht dieses Erdkabel den Autobahnen.  Es transportiert den Strom unterirdisch deutschlandweit über weite Strecken hin zu  Orten, an denen es viele Verbraucher gibt.',
    price: 10,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 0,
      systemPoints: 0,
      conditions: [],
    },
  },
  'Oberirdische Höchstspannungsleitung': {
    title: 'Oberirdische Höchstspannungsleitung',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Vergleichen wir das Strom- mit dem Straßennetz, so entspricht diese Freileitung den Autobahnen. Sie transportiert den Strom unterirdisch deutschlandweit über weite Strecken hin zu  Orten, an denen es viele Verbraucher gibt.',
    price: 5,
    resources: 1,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 0,
      systemPoints: 0,
      conditions: [],
    },
  },
  'Freileitung Südlink': {
    title: 'Freileitung Südlink',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Im Norden erzeugter Windstrom wird mittels  Hochspannungs-Gleichstrom-Übertragung überirdisch in den Süden  transportiert. Vergleichen wir das Strom- mit dem Straßennetz, so entspricht diese Freileitung den Autobahnen.',
    price: 4,
    resources: 1,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 0,
      systemPoints: 0,
      conditions: [],
    },
  },
  'Erdkabel Südlink': {
    title: 'Erdkabel Südlink',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Im Norden erzeugter Windstrom wird mittels  Hochspannungs-Gleichstrom-Übertragung unterirdisch in den Süden  transportiert. Vergleichen wir das Strom- mit dem Straßennetz, so entspricht dieses Erdkabel den Autobahnen.',
    price: 10,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 0,
      systemPoints: 0,
      conditions: [],
    },
  },
  Nahwärmenetz: {
    title: 'Nahwärmenetz',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Das Nahwärmenetz transportiert zentral erzeugte Wärme oder Abwärme aus Fabriken oder Kraftwerken innerhalb eines Wohngebiets für die eigene Wärmeversorgung zu Hause.',
    price: 4,
    resources: 2,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Distribution',
      energy: 'Heat',
      size: 1,
    },
    points: {
      basePoints: 0,
      systemPoints: 0,
      conditions: [],
    },
  },
  Fernwärmenetz: {
    title: 'Fernwärmenetz',
    image: '/images/fernwaerme.png',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Das Fernwärmenetz transportiert zentral erzeugte Wärme oder Abwärme aus Fabriken oder Kraftwerken über mehrere Kilometer für die eigene Wärmeversorgung zu Hause.',
    price: 7,
    resources: 2,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Distribution',
      energy: 'Heat',
      size: 2,
    },
    points: {
      basePoints: 0,
      systemPoints: 0,
      conditions: [],
    },
  },
  'E-Autos als Speicher': {
    title: 'E-Autos als Speicher',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation: 'Laden und Entladen von E-Autos kann helfen Netzschwankungen auszugleichen.',
    price: 1,
    resources: 1,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      basePoints: 4,
      systemPoints: 6,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 1,
        },
      ],
    },
  },
  Wärmespeicher: {
    title: 'Wärmespeicher',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Wärme die aus der Sonnenenergie oder Umwelttemperatur gewonnen wird, muss für die spätere Nutzung gespeichert werden.',
    price: 5,
    resources: 4,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Heat',
      size: 3,
    },
    points: {
      basePoints: 12,
      systemPoints: 20,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Heat',
          size: 3,
        },
      ],
    },
  },
  'Batteriespeicher im Haus': {
    title: 'Batteriespeicher im Haus',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Strom aus der Sonnenenergie muss bis zum späteren Verbrauch in einer Batterie gespeichert werden.',
    price: 2,
    resources: 1,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      basePoints: 4,
      systemPoints: 6,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 1,
        },
      ],
    },
  },
  Wasserstoffspeicher: {
    title: 'Wasserstoffspeicher',
    image: '/images/wasserstoffspeicher.png',
    text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
    explanation: 'Mit Hilfe von Wasserstoff kann Energie gespeichert werden.',
    price: 8,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 6,
      systemPoints: 10,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },
  },
  'Großer Wasserstoffspeicher': {
    title: 'Großer Wasserstoffspeicher',
    image: '/images/wasserstoffspeicher.png',
    text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
    explanation: 'Mit Hilfe von Wasserstoff kann Energie gespeichert werden.',
    price: 10,
    resources: 4,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 8,
      systemPoints: 13,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 4,
        },
      ],
    },
  },
  Schwungradspeicher: {
    title: 'Schwungradspeicher',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation: 'Elektrische Energie wird in der Drehung einer großen Masse gespeichert. ',
    price: 3,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 2,
    },
    points: {
      basePoints: 8,
      systemPoints: 13,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 2,
        },
      ],
    },
  },
  Fernwärmespeicher: {
    title: 'Fernwärmespeicher',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation: 'Wärme wird in einem großen Speicher gleich für mehrere Haushalte gespeichert. ',
    price: 3,
    resources: 4,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Heat',
      size: 2,
    },
    points: {
      basePoints: 8,
      systemPoints: 13,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Heat',
          size: 3,
        },
      ],
    },
  },
  'Lithium-Ionen-Batterie Park': {
    title: 'Lithium-Ionen-Batterie Park',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Große Speicher werden genutzt um Schwankungen auszugleichen. Lithium-Ionen sind dabei besonders gut geeignet.',
    price: 7,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 12,
      systemPoints: 20,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },
  },
  'Natrium-Ionen-Batterie Park': {
    title: 'Natrium-Ionen-Batterie Park',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Große Speicher werden genutzt um Schwankungen auszugleichen. Lithium-Ionen sind umweltfreundlich und günstig.',
    price: 7,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 12,
      systemPoints: 20,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },
  },
  Bleiakkumulator: {
    title: 'Bleiakkumulator',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation: 'Sind schwere und robuste Batterien zur Notstromversorgung.',
    price: 2,
    resources: 2,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      basePoints: 4,
      systemPoints: 6,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 2,
        },
      ],
    },
  },
  'Redox-Flow-Batterie': {
    title: 'Redox-Flow-Batterie',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Redox-Flow-Batterien eignen sich für Kurz- und Langzeitspeicherung, sind aber noch in Entwicklung. ',
    price: 8,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 11,
      systemPoints: 18,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },
  },
  Pumpspeicherkraftwerk: {
    title: 'Pumpspeicherkraftwerk',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Strom, welcher durch das Abfließen von Wasser aus einem Stausee ins Tal generiert wird.',
    price: 4,
    resources: 4,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 11,
      systemPoints: 18,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 4,
        },
      ],
    },
  },
  Methanspeicher: {
    title: 'Methanspeicher',
    image: '',
    text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
    explanation: 'Speicher welche Gas oder grün erzeugtes Methan speichern können.',
    price: 9,
    resources: 4,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 8,
      systemPoints: 13,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 4,
        },
      ],
    },
  },
  Ammoniakspeicher: {
    title: 'Ammoniakspeicher',
    image: '',
    text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
    explanation:
      'Ammoniak speichert Wasserstoff, der bei Bedarf freigesetzt und zur Energiegewinnung genutzt werden kann.',
    price: 10,
    resources: 3,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      basePoints: 6,
      systemPoints: 10,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 4,
        },
      ],
    },
  },
  Druckluftspeicher: {
    title: 'Druckluftspeicher',
    image: '',
    text: 'Speicher entlasten das Netz, weil sie überschüssige Energie speichern und später abgeben, wenn zu wenig produziert wird.',
    explanation:
      'Luft wird in unterirdische Kavernen gepresst und kann bei Bedarf durch eine Turbine expandiert werden zur Energiefreisetzung.',
    price: 6,
    resources: 4,
    type: 'technology',
    energyCharacteristics: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      basePoints: 12,
      systemPoints: 20,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 4,
        },
      ],
    },
  },
  Gebäudeisolation: {
    title: 'Gebäudeisolation',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet jeweils 2 Einheiten Ressourcen und Geld.',
    explanation: 'Gut isolierte Gebäude brauchen weniger Energie zum Heizen/Kühlen.',
    price: 2,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 2,
      systemPoints: 2,
      conditions: [],
    },
  },
  'Ausbau der Eisenbahn': {
    title: 'Ausbau der Eisenbahn',
    image: '/images/klimaaktion.png',
    text: '',
    explanation:
      'Das Nutzen von öffentlichen Verkehrsmitteln reduziert Emissionen. Der Ausbau steigert die Attraktivität. Am Besten mit grünem Strom antreiben.',
    price: 2,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 3,
        },
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },
  },
  'Verbrenner-Aus': {
    title: 'Verbrenner-Aus',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Das Verbieten von Neuzulassungen von Verbrennern ist eine sozialgerechte und effektive Möglichkeit die Emissionen im Verkehrssektor zu senken.',
    price: 0,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 2,
        },
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 2,
        },
      ],
    },
  },
  'Subventionierung von E-Autos': {
    title: 'Subventionierung von E-Autos',
    image: '/images/klimaaktion.png',
    text: '',
    explanation: 'Elektromobilität ist ein wichtiger Pfeiler der Verkehrswende. ',
    price: 2,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 2,
        },
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 2,
        },
      ],
    },
  },
  'CO2-Abscheidung und -Speicherung': {
    title: 'CO2-Abscheidung und -Speicherung',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Das von Kraftwerken ausgestoßene CO2 wird herausgefiltert. Dieses abgeschiedene CO2 kann als Rohstoff z.B. in der Chemie-Industrie dienen.',
    price: 2,
    resources: 0,
    type: 'climateAction',
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
  },
  'H2-betriebene Schiffe': {
    title: 'H2-betriebene Schiffe',
    image: '/images/klimaaktion.png',
    text: '',
    explanation:
      'Wasserstoff (H2) gilt als alternativer grüner Kraftstoff. Die Nutzung bietet sich vor allem auf langen Strecken an, da Batterien nicht die notwendige Reichweite bieten können.',
    price: 2,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: ['ChemicalEnergy'],
    },
  },
  'E-Buslinien in ländlicher Region': {
    title: 'E-Buslinien in ländlicher Region',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Das Nutzen von öffentlichen Verkehrsmitteln reduziert Emissionen. Auf dem Land ist die Verfügbarkeit jedoch noch sehr dünn.​',
    price: 2,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 3,
        },
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },
  },
  'Power-to-X': {
    title: 'Power-to-X',
    image: '/images/klimaaktion.png',
    text: 'Für ein gebautes Gaskraftwerk erhaltet ihr 5 zusätzliche Fortschrittspunkte.',
    explanation:
      'Power-to-X Technologien speichern Stromüberschüsse aus erneuerbaren Energien und wandeln sie in chemische Energieträger (z.B. H2) für Langfristspeicherung und Verkehr um.',
    price: 2,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 3,
        },
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 3,
        },
      ],
    },
  },
  'CO2-neutraler Flugverkehr': {
    title: 'CO2-neutraler Flugverkehr',
    image: '/images/klimaaktion.png',
    text: '',
    explanation:
      'Die Nutzung von synthetischem Kerosin bietet eine grünere Alternative zu fossilem Kraftstoff, die für Flugzeuge geeignet ist.',
    price: 2,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: ['ChemicalEnergy'],
    },
  },
  'Verbot von Inlandsflügen': {
    title: 'Verbot von Inlandsflügen',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Kurzstreckenflüge sind ineffizient, da Start und Landung viel Energie verbrauchen. Sie verursachen pro Person deutlich mehr CO₂ als Züge oder Busse.​',
    price: 0,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 2,
      systemPoints: 2,
      conditions: [],
    },
  },
  'Kunsstoff-Recycling': {
    title: 'Kunsstoff-Recycling',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet jeweils 2 Einheiten Ressourcen und Geld.',
    explanation:
      'Recycelter Kunststoff wird gereinigt, zerkleinert und geschmolzen, um neue Produkte wie Verpackungen oder Bauteile herzustellen.​',
    price: 2,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 2,
        },
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 2,
        },
      ],
    },
  },
  'Subventionierung von Erneuerbaren': {
    title: 'Subventionierung von Erneuerbaren',
    image: '/images/klimaaktion.png',
    text: 'Alle Wind- und Photovoltaik-Technologien kosten 2 Geldeinheiten weniger, aber mindestens 1 Geldeinheit.',
    explanation: 'Das Fördern von Erneuerbaren soll deren Ausbau Beschleunigen.',
    price: 2,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: [
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 2,
        },
      ],
    },
  },
  'Batterie-Recycling': {
    title: 'Batterie-Recycling',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet jeweils 2 Einheiten Ressourcen und Geld.',
    explanation:
      'Recycling von Batterien ist wichtig, um wertvolle Rohstoffe zurückzugewinnen und sorgt für eine nachhaltigere Nutzung von Ressourcen.​',
    price: 2,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 0,
      systemPoints: 2,
      conditions: [
        {
          technology: 'Generation',
          energy: 'Electricity',
          size: 2,
        },
        {
          technology: 'Distribution',
          energy: 'Electricity',
          size: 2,
        },
      ],
    },
  },
  'Pendeln mit dem Fahrrad': {
    title: 'Pendeln mit dem Fahrrad',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation: 'Ab jetzt pendelt ihr mit dem Fahrrad zur Schule/Uni/Arbeit.',
    price: 0,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 2,
      systemPoints: 2,
      conditions: [],
    },
  },
  'Sharing is Caring': {
    title: 'Sharing is Caring',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Statt viel Geld für immer neue Dinge auszugeben tauscht oder leiht ihr. Wenn dies nicht möglich ist, kauft ihr second-hand.',
    price: 0,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 2,
      systemPoints: 2,
      conditions: [],
    },
  },
  'Umweltbewusste Ernährung': {
    title: 'Umweltbewusste Ernährung',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Ihr verzichtet weitestgehend auf tierische Produkte, achtest auf Regionalität und Saisonalität und verringert Lebensmittelverschwendung.',
    price: 0,
    resources: 0,
    type: 'climateAction',
    points: {
      basePoints: 2,
      systemPoints: 2,
      conditions: [],
    },
  },
};
