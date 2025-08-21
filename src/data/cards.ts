import { ProgressCard } from '../types/ProgressCards';

export const cards: Record<string, ProgressCard> = {
  Kohlekraftwerk: {
    name: 'Kohlekraftwerk',
    image: '',
    text: 'Strom und Wärme müssen verteilt werden. CO2 muss aus dem Abgas entfernt werden.',
    explanation: 'Verbrennung von Kohle erzeugt Strom und die Abwärme ist nutzbar für Fernwärme.',
    moneyCosts: 8,
    resourceCosts: 5,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 1,
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
    name: 'Photovoltaik auf dem Dach',
    image: '/images/photovoltaik.png',
    text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
    explanation: 'Photovoltaik generiert aus Sonnenlicht Strom.',
    moneyCosts: 1,
    resourceCosts: 1,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      baseProgressPoints: 3,
      systemProgressPoints: 6,
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
    name: 'Balkon-Photovoltaik',
    image: '',
    text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
    explanation:
      'Eine kleine Photovoltaikanalage auf deinem Balkon generiert aus Sonnenlicht Strom.',
    moneyCosts: 1,
    resourceCosts: 1,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      baseProgressPoints: 3,
      systemProgressPoints: 6,
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
    name: 'Solarthermie-Anlage auf Dach',
    image: '',
    text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Wärme gespeichert werden.',
    explanation:
      'Solarthermieanlagen erzeugen aus Sonnenenergie warmes Wasser für deine Dusche und Heizung.',
    moneyCosts: 1,
    resourceCosts: 1,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Heat',
      size: 1,
    },
    points: {
      baseProgressPoints: 2,
      systemProgressPoints: 5,
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
    name: 'Ölheizung',
    image: '',
    text: '',
    explanation: 'Eine Erdölheizung erzeugt durch Ölverbrennung Wärme für deine Heizung.',
    moneyCosts: 2,
    resourceCosts: 2,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Heat',
      size: 1,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 1,
      conditions: [],
    },
  },
  Erdwärmeheizung: {
    name: 'Erdwärmeheizung',
    image: '',
    text: 'Um das volle Potenzial nutzen zu können, muss Wärme gespeichert werden.',
    explanation: 'Die Wärme aus dem Erdboden wird für deine Heizung genutzt.',
    moneyCosts: 2,
    resourceCosts: 1,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Heat',
      size: 1,
    },
    points: {
      baseProgressPoints: 2,
      systemProgressPoints: 6,
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
    name: 'Kleiner Windpark',
    image: '',
    text: 'Der Strom muss verteilt werden. In windreichen Stunden muss Strom gespeichert werden.',
    explanation: 'Windkraftanlagen nutzen den Wind um daraus Strom zu erzeugen.',
    moneyCosts: 2,
    resourceCosts: 2,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 2,
    },
    points: {
      baseProgressPoints: 6,
      systemProgressPoints: 11,
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
    name: 'Großer Photovoltaik-Park',
    image: '',
    text: 'Der Strom muss verteilt werden. In sonnenreichen Stunden muss Strom gespeichert werden.',
    explanation: 'Mit Sonnenlicht wird im großen Maße Strom erzeugt.',
    moneyCosts: 2,
    resourceCosts: 2,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 2,
    },
    points: {
      baseProgressPoints: 6,
      systemProgressPoints: 11,
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
    name: 'Gaskraftwerk',
    image: '',
    text: 'Strom und Wärme müssen verteilt werden. CO2 muss aus dem Abgas entfernt werden.',
    explanation:
      'Durch das Verbrennen von Gas kann Stromerzeugt werden, die Abwärme kann für Fernwärme genutzt werden.',
    moneyCosts: 6,
    resourceCosts: 4,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 1,
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
    name: 'Großer Windpark',
    image: '',
    text: 'Der Strom muss verteilt werden. In windreichen Stunden muss Strom gespeichert werden.',
    explanation: 'Viele Windkraftanalgen erzeugen aus Wind im großen Maße Strom.',
    moneyCosts: 3,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 9,
      systemProgressPoints: 16,
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
    name: 'Geothermieheizwerk',
    image: '',
    text: 'Die Wärme muss  verteilt werden.',
    explanation: 'Durch Geothermie kann Erdwärme genutzt und ins Fernwärmenetz eingespeist werden.',
    moneyCosts: 4,
    resourceCosts: 2,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Heat',
      size: 2,
    },
    points: {
      baseProgressPoints: 5,
      systemProgressPoints: 14,
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
    name: 'Atomkraftwerk',
    image: '',
    text: 'Strom muss verteilt und ein Endlager für radioaktiven Abfall gefunden werden.',
    explanation: 'Durch Spaltung von Uran wird Strom und Wärme erzeugt.',
    moneyCosts: 10,
    resourceCosts: 5,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 10,
      systemProgressPoints: 18,
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
    name: 'Laufwasserkraftwerk',
    image: '',
    text: 'Der Strom muss verteilt werden.',
    explanation: 'Durch die Flussströmung kann Strom erzeugt werden.',
    moneyCosts: 4,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 9,
      systemProgressPoints: 16,
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
    name: 'Offshore Windpark',
    image: '',
    text: 'Der Strom muss verteilt werden. In windreichen Stunden muss Strom gespeichert werden.',
    explanation: 'Viele Windkraftanalgen erzeugen aus Wind vor der Küste Strom.',
    moneyCosts: 7,
    resourceCosts: 4,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 12,
      systemProgressPoints: 21,
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
    name: 'Luft-Wärmepumpe',
    image: '',
    text: 'Für den Betrieb der Wärmepumpe wird Strom benötigt.',
    explanation: 'Luft-Wärmepumpe: Nutzt Strom um mit der Umgebungstemperatur zu heizen.',
    moneyCosts: 2,
    resourceCosts: 1,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Heat',
      size: 1,
    },
    points: {
      baseProgressPoints: 2,
      systemProgressPoints: 6,
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
    name: 'Eisenkraftwerk',
    image: '',
    text: 'Bau auf Kohlekraftwerk: Zahle nur 4 Geldeinheiten und 1 Ressource. Strom und Wärme müssen verteilt werden.',
    explanation:
      'Strom und Abwärme werden durch Verbrennung von Eisen erzeugt. Dafür kann ein Kohlekraftwerk umgerüstet werden.',
    moneyCosts: 9,
    resourceCosts: 4,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 10,
      systemProgressPoints: 18,
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
    name: 'Biomassekraftwerk',
    image: '',
    text: 'Strom und Wärme müssen verteilt werden.',
    explanation: 'Strom wird durch die Verbrennung von Biomasse, z.B. Altholz, erzeugt.',
    moneyCosts: 7,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Generation',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 9,
      systemProgressPoints: 16,
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
    name: 'Erdkabel für kommunale Verteilung',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Vergleichen wir das Strom- mit dem Straßennetz, so entspricht dieses Erdkabel den Straßen innerhalb eines Ortes. Es transportiert den Strom unterirdisch zu den Haushalten.',
    moneyCosts: 1,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 0,
      conditions: [],
    },
  },
  'Erdkabel für regionale Verteilung': {
    name: 'Erdkabel für regionale Verteilung',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Vergleichen wir das Strom- mit dem Straßennetz, so entspricht dieses Erdkabel den Landstraßen.  Es transportiert den Strom unterirdisch innerhalb einer Region.',
    moneyCosts: 1,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 2,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 0,
      conditions: [],
    },
  },
  'Freileitungen für überregionale Verteilung': {
    name: 'Freileitungen für überregionale Verteilung',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Vergleichen wir das Strom- mit dem Straßennetz, so entspricht diese Freileitung den Bundesstraßen. Sie transportiert den  Strom überirdisch zwischen Regionen.',
    moneyCosts: 2,
    resourceCosts: 1,
    type: 'technology',
    supply: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 0,
      conditions: [],
    },
  },
  'Erdkabel für Stromübertragung auf weiten Strecken': {
    name: 'Erdkabel für Stromübertragung auf weiten Strecken',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Vergleichen wir das Strom- mit dem Straßennetz, so entspricht dieses Erdkabel den Autobahnen.  Es transportiert den Strom unterirdisch deutschlandweit über weite Strecken hin zu  Orten, an denen es viele Verbraucher gibt.',
    moneyCosts: 10,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 0,
      conditions: [],
    },
  },
  'Oberirdische Höchstspannungsleitung': {
    name: 'Oberirdische Höchstspannungsleitung',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Vergleichen wir das Strom- mit dem Straßennetz, so entspricht diese Freileitung den Autobahnen. Sie transportiert den Strom unterirdisch deutschlandweit über weite Strecken hin zu  Orten, an denen es viele Verbraucher gibt.',
    moneyCosts: 5,
    resourceCosts: 1,
    type: 'technology',
    supply: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 0,
      conditions: [],
    },
  },
  'Freileitung Südlink': {
    name: 'Freileitung Südlink',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Im Norden erzeugter Windstrom wird mittels  Hochspannungs-Gleichstrom-Übertragung überirdisch in den Süden  transportiert. Vergleichen wir das Strom- mit dem Straßennetz, so entspricht diese Freileitung den Autobahnen.',
    moneyCosts: 4,
    resourceCosts: 1,
    type: 'technology',
    supply: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 0,
      conditions: [],
    },
  },
  'Erdkabel Südlink': {
    name: 'Erdkabel Südlink',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Im Norden erzeugter Windstrom wird mittels  Hochspannungs-Gleichstrom-Übertragung unterirdisch in den Süden  transportiert. Vergleichen wir das Strom- mit dem Straßennetz, so entspricht dieses Erdkabel den Autobahnen.',
    moneyCosts: 10,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Distribution',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 0,
      conditions: [],
    },
  },
  Nahwärmenetz: {
    name: 'Nahwärmenetz',
    image: '',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Das Nahwärmenetz transportiert zentral erzeugte Wärme oder Abwärme aus Fabriken oder Kraftwerken innerhalb eines Wohngebiets für die eigene Wärmeversorgung zu Hause.',
    moneyCosts: 4,
    resourceCosts: 2,
    type: 'technology',
    supply: {
      technology: 'Distribution',
      energy: 'Heat',
      size: 1,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 0,
      conditions: [],
    },
  },
  Fernwärmenetz: {
    name: 'Fernwärmenetz',
    image: '/images/fernwaerme.png',
    text: 'Diese Karte allein  gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
    explanation:
      'Das Fernwärmenetz transportiert zentral erzeugte Wärme oder Abwärme aus Fabriken oder Kraftwerken über mehrere Kilometer für die eigene Wärmeversorgung zu Hause.',
    moneyCosts: 7,
    resourceCosts: 2,
    type: 'technology',
    supply: {
      technology: 'Distribution',
      energy: 'Heat',
      size: 2,
    },
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 0,
      conditions: [],
    },
  },
  'E-Autos als Speicher': {
    name: 'E-Autos als Speicher',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation: 'Laden und Entladen von E-Autos kann helfen Netzschwankungen auszugleichen.',
    moneyCosts: 1,
    resourceCosts: 1,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      baseProgressPoints: 4,
      systemProgressPoints: 6,
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
    name: 'Wärmespeicher',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Wärme die aus der Sonnenenergie oder Umwelttemperatur gewonnen wird, muss für die spätere Nutzung gespeichert werden.',
    moneyCosts: 5,
    resourceCosts: 4,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Heat',
      size: 3,
    },
    points: {
      baseProgressPoints: 12,
      systemProgressPoints: 20,
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
    name: 'Batteriespeicher im Haus',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Strom aus der Sonnenenergie muss bis zum späteren Verbrauch in einer Batterie gespeichert werden.',
    moneyCosts: 2,
    resourceCosts: 1,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      baseProgressPoints: 4,
      systemProgressPoints: 6,
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
    name: 'Wasserstoffspeicher',
    image: '/images/wasserstoffspeicher.png',
    text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
    explanation: 'Mit Hilfe von Wasserstoff kann Energie gespeichert werden.',
    moneyCosts: 8,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 6,
      systemProgressPoints: 10,
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
    name: 'Großer Wasserstoffspeicher',
    image: '/images/wasserstoffspeicher.png',
    text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
    explanation: 'Mit Hilfe von Wasserstoff kann Energie gespeichert werden.',
    moneyCosts: 10,
    resourceCosts: 4,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 8,
      systemProgressPoints: 13,
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
    name: 'Schwungradspeicher',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation: 'Elektrische Energie wird in der Drehung einer großen Masse gespeichert. ',
    moneyCosts: 3,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 2,
    },
    points: {
      baseProgressPoints: 8,
      systemProgressPoints: 13,
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
    name: 'Fernwärmespeicher',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation: 'Wärme wird in einem großen Speicher gleich für mehrere Haushalte gespeichert. ',
    moneyCosts: 3,
    resourceCosts: 4,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Heat',
      size: 2,
    },
    points: {
      baseProgressPoints: 8,
      systemProgressPoints: 13,
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
    name: 'Lithium-Ionen-Batterie Park',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Große Speicher werden genutzt um Schwankungen auszugleichen. Lithium-Ionen sind dabei besonders gut geeignet.',
    moneyCosts: 7,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 12,
      systemProgressPoints: 20,
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
    name: 'Natrium-Ionen-Batterie Park',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Große Speicher werden genutzt um Schwankungen auszugleichen. Lithium-Ionen sind umweltfreundlich und günstig.',
    moneyCosts: 7,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 12,
      systemProgressPoints: 20,
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
    name: 'Bleiakkumulator',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation: 'Sind schwere und robuste Batterien zur Notstromversorgung.',
    moneyCosts: 2,
    resourceCosts: 2,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 1,
    },
    points: {
      baseProgressPoints: 4,
      systemProgressPoints: 6,
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
    name: 'Redox-Flow-Batterie',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Redox-Flow-Batterien eignen sich für Kurz- und Langzeitspeicherung, sind aber noch in Entwicklung. ',
    moneyCosts: 8,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 11,
      systemProgressPoints: 18,
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
    name: 'Pumpspeicherkraftwerk',
    image: '',
    text: 'Überschüssige Energie wird gespeichert.',
    explanation:
      'Strom, welcher durch das Abfließen von Wasser aus einem Stausee ins Tal generiert wird.',
    moneyCosts: 4,
    resourceCosts: 4,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 11,
      systemProgressPoints: 18,
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
    name: 'Methanspeicher',
    image: '',
    text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
    explanation: 'Speicher welche Gas oder grün erzeugtes Methan speichern können.',
    moneyCosts: 9,
    resourceCosts: 4,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 8,
      systemProgressPoints: 13,
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
    name: 'Ammoniakspeicher',
    image: '',
    text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
    explanation:
      'Ammoniak speichert Wasserstoff, der bei Bedarf freigesetzt und zur Energiegewinnung genutzt werden kann.',
    moneyCosts: 10,
    resourceCosts: 3,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 3,
    },
    points: {
      baseProgressPoints: 6,
      systemProgressPoints: 10,
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
    name: 'Druckluftspeicher',
    image: '',
    text: 'Speicher entlasten das Netz, weil sie überschüssige Energie speichern und später abgeben, wenn zu wenig produziert wird.',
    explanation:
      'Luft wird in unterirdische Kavernen gepresst und kann bei Bedarf durch eine Turbine expandiert werden zur Energiefreisetzung.',
    moneyCosts: 6,
    resourceCosts: 4,
    type: 'technology',
    supply: {
      technology: 'Storage',
      energy: 'Electricity',
      size: 4,
    },
    points: {
      baseProgressPoints: 12,
      systemProgressPoints: 20,
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
    name: 'Gebäudeisolation',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet jeweils 2 Einheiten Ressourcen und Geld.',
    explanation: 'Gut isolierte Gebäude brauchen weniger Energie zum Heizen/Kühlen.',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 2,
      systemProgressPoints: 2,
      conditions: [],
    },
  },
  'Ausbau der Eisenbahn': {
    name: 'Ausbau der Eisenbahn',
    image: '/images/klimaaktion.png',
    text: '',
    explanation:
      'Das Nutzen von öffentlichen Verkehrsmitteln reduziert Emissionen. Der Ausbau steigert die Attraktivität. Am Besten mit grünem Strom antreiben.',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
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
    name: 'Verbrenner-Aus',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Das Verbieten von Neuzulassungen von Verbrennern ist eine sozialgerechte und effektive Möglichkeit die Emissionen im Verkehrssektor zu senken.',
    moneyCosts: 0,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
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
    name: 'Subventionierung von E-Autos',
    image: '/images/klimaaktion.png',
    text: '',
    explanation: 'Elektromobilität ist ein wichtiger Pfeiler der Verkehrswende. ',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
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
    name: 'CO2-Abscheidung und -Speicherung',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Das von Kraftwerken ausgestoßene CO2 wird herausgefiltert. Dieses abgeschiedene CO2 kann als Rohstoff z.B. in der Chemie-Industrie dienen.',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
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
    name: 'H2-betriebene Schiffe',
    image: '/images/klimaaktion.png',
    text: '',
    explanation:
      'Wasserstoff (H2) gilt als alternativer grüner Kraftstoff. Die Nutzung bietet sich vor allem auf langen Strecken an, da Batterien nicht die notwendige Reichweite bieten können.',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
      conditions: ['ChemicalEnergy'],
    },
  },
  'E-Buslinien in ländlicher Region': {
    name: 'E-Buslinien in ländlicher Region',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Das Nutzen von öffentlichen Verkehrsmitteln reduziert Emissionen. Auf dem Land ist die Verfügbarkeit jedoch noch sehr dünn.​',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
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
    name: 'Power-to-X',
    image: '/images/klimaaktion.png',
    text: 'Für ein gebautes Gaskraftwerk erhaltet ihr 5 zusätzliche Fortschrittspunkte.',
    explanation:
      'Power-to-X Technologien speichern Stromüberschüsse aus erneuerbaren Energien und wandeln sie in chemische Energieträger (z.B. H2) für Langfristspeicherung und Verkehr um.',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
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
    name: 'CO2-neutraler Flugverkehr',
    image: '/images/klimaaktion.png',
    text: '',
    explanation:
      'Die Nutzung von synthetischem Kerosin bietet eine grünere Alternative zu fossilem Kraftstoff, die für Flugzeuge geeignet ist.',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
      conditions: ['ChemicalEnergy'],
    },
  },
  'Verbot von Inlandsflügen': {
    name: 'Verbot von Inlandsflügen',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Kurzstreckenflüge sind ineffizient, da Start und Landung viel Energie verbrauchen. Sie verursachen pro Person deutlich mehr CO₂ als Züge oder Busse.​',
    moneyCosts: 0,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 2,
      systemProgressPoints: 2,
      conditions: [],
    },
  },
  'Kunsstoff-Recycling': {
    name: 'Kunsstoff-Recycling',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet jeweils 2 Einheiten Ressourcen und Geld.',
    explanation:
      'Recycelter Kunststoff wird gereinigt, zerkleinert und geschmolzen, um neue Produkte wie Verpackungen oder Bauteile herzustellen.​',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
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
    name: 'Subventionierung von Erneuerbaren',
    image: '/images/klimaaktion.png',
    text: 'Alle Wind- und Photovoltaik-Technologien kosten 2 Geldeinheiten weniger, aber mindestens 1 Geldeinheit.',
    explanation: 'Das Fördern von Erneuerbaren soll deren Ausbau Beschleunigen.',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
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
    name: 'Batterie-Recycling',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet jeweils 2 Einheiten Ressourcen und Geld.',
    explanation:
      'Recycling von Batterien ist wichtig, um wertvolle Rohstoffe zurückzugewinnen und sorgt für eine nachhaltigere Nutzung von Ressourcen.​',
    moneyCosts: 2,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 0,
      systemProgressPoints: 2,
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
    name: 'Pendeln mit dem Fahrrad',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation: 'Ab jetzt pendelt ihr mit dem Fahrrad zur Schule/Uni/Arbeit.',
    moneyCosts: 0,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 2,
      systemProgressPoints: 2,
      conditions: [],
    },
  },
  'Sharing is Caring': {
    name: 'Sharing is Caring',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Statt viel Geld für immer neue Dinge auszugeben tauscht oder leiht ihr. Wenn dies nicht möglich ist, kauft ihr second-hand.',
    moneyCosts: 0,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 2,
      systemProgressPoints: 2,
      conditions: [],
    },
  },
  'Umweltbewusste Ernährung': {
    name: 'Umweltbewusste Ernährung',
    image: '/images/klimaaktion.png',
    text: 'Ihr erhaltet 2 Ressourcen.',
    explanation:
      'Ihr verzichtet weitestgehend auf tierische Produkte, achtest auf Regionalität und Saisonalität und verringert Lebensmittelverschwendung.',
    moneyCosts: 0,
    resourceCosts: 0,
    type: 'climateAction',
    points: {
      baseProgressPoints: 2,
      systemProgressPoints: 2,
      conditions: [],
    },
  },
};
