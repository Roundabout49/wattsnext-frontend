import EmptyCardSmall from '../components/cards/EmptyCardSmall';
import ProgressCardLarge from '../components/cards/ProgressCardLarge';
import ProgressCardSmall from '../components/cards/ProgressCardSmall';

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <ProgressCardSmall
          card={{
            name: 'Photovoltaik auf dem Dach',
            image: '/images/photovoltaik.png',
            text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
            explanation: 'Photovoltaik generiert aus Sonnenlicht Strom.',
            points: { baseProgressPoints: 2, systemProgressPoints: 5 },
            moneyCosts: 1,
            resourceCosts: 1,
            supply: { technology: 'Generation', energy: 'Electricity', size: 1 },
            type: 'technology',
          }}
        ></ProgressCardSmall>
        <EmptyCardSmall />
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <ProgressCardLarge
          card={{
            name: 'Photovoltaik auf dem Dach',
            image: '/images/photovoltaik.png',
            text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
            explanation: 'Photovoltaik generiert aus Sonnenlicht Strom.',
            points: { baseProgressPoints: 2, systemProgressPoints: 5 },
            moneyCosts: 1,
            resourceCosts: 1,
            supply: { technology: 'Generation', energy: 'Electricity', size: 1 },
            type: 'technology',
          }}
        ></ProgressCardLarge>
        <ProgressCardLarge
          card={{
            name: 'Fernwärmenetz',
            image: '/images/fernwaerme.png',
            text: 'Diese Karte allein gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
            explanation:
              'Das Fernwärmenetz transportiert zentral erzeugte Wärme oder Abwärme aus Fabriken oder Kraftwerken über mehrere Kilometer für die eigene Wärmeversorgung zu Hause.',
            moneyCosts: 7,
            resourceCosts: 2,
            supply: { technology: 'Distribution', energy: 'Heat', size: 2 },
            type: 'technology',
          }}
        ></ProgressCardLarge>
        <ProgressCardLarge
          card={{
            name: 'Großer Wasserstoffspeicher',
            image: '/images/wasserstoffspeicher.png',
            text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
            explanation: 'Mit Hilfe von Wasserstoff kann Energie gespeichert werden.',
            points: {
              baseProgressPoints: 8,
              systemProgressPoints: 13,
              conditions: [{ technology: 'Generation', energy: 'Electricity', size: 4 }],
            },
            moneyCosts: 10,
            resourceCosts: 4,
            supply: { technology: 'Storage', energy: 'Electricity', size: 4 },
            type: 'technology',
          }}
        ></ProgressCardLarge>
        <ProgressCardLarge
          card={{
            name: 'CO2-Abscheidung',
            image: '/images/klimaaktion.png',
            text: 'Ihr erhaltet 2 Ressourcen.',
            explanation:
              'Das von Kraftwerken ausgestoßene CO2 wird herausgefiltert. Dieses abgeschiedene CO2 kann als Rohstoff z.B. in der Chemie-Industrie dienen.',
            moneyCosts: 2,
            resourceCosts: 0,
            supply: 'CarbonCapture',
            type: 'climateAction',
          }}
        ></ProgressCardLarge>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <ProgressCardSmall
          card={{
            name: 'Photovoltaik auf dem Dach',
            image: '/images/photovoltaik.png',
            text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
            explanation: 'Photovoltaik generiert aus Sonnenlicht Strom.',
            points: { baseProgressPoints: 2, systemProgressPoints: 5 },
            moneyCosts: 1,
            resourceCosts: 1,
            supply: { technology: 'Generation', energy: 'Electricity', size: 1 },
            type: 'technology',
          }}
        ></ProgressCardSmall>
        <ProgressCardSmall
          card={{
            name: 'Fernwärmenetz',
            image: '/images/fernwaerme.png',
            text: 'Diese Karte allein gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
            explanation:
              'Das Fernwärmenetz transportiert zentral erzeugte Wärme oder Abwärme aus Fabriken oder Kraftwerken über mehrere Kilometer für die eigene Wärmeversorgung zu Hause.',
            moneyCosts: 7,
            resourceCosts: 2,
            supply: { technology: 'Distribution', energy: 'Heat', size: 2 },
            type: 'technology',
          }}
        ></ProgressCardSmall>
        <ProgressCardSmall
          card={{
            name: 'Großer Wasserstoffspeicher',
            image: '/images/wasserstoffspeicher.png',
            text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
            explanation: 'Mit Hilfe von Wasserstoff kann Energie gespeichert werden.',
            moneyCosts: 10,
            resourceCosts: 4,
            supply: { technology: 'Storage', energy: 'Electricity', size: 4 },
            type: 'technology',
          }}
        ></ProgressCardSmall>
      </div>
    </div>
  );
}
