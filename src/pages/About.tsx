import ProgressCard from '../components/ProgressCard';
import ProgressCardSmall from '../components/ProgressCardSmall';

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <ProgressCardSmall
          card={{
            title: 'Photovoltaik auf dem Dach',
            image: '/images/photovoltaik.png',
            text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
            explanation: 'Photovoltaik generiert aus Sonnenlicht Strom.',
            basePoints: 2,
            systemPoints: 5,
            price: 1,
            resources: 1,
            energyCharacteristics: { technology: 'Generation', energy: 'Electricity', size: 1 },
            type: 'technology',
          }}
        ></ProgressCardSmall>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <ProgressCard
          card={{
            title: 'Photovoltaik auf dem Dach',
            image: '/images/photovoltaik.png',
            text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
            explanation: 'Photovoltaik generiert aus Sonnenlicht Strom.',
            basePoints: 2,
            systemPoints: 5,
            price: 1,
            resources: 1,
            energyCharacteristics: { technology: 'Generation', energy: 'Electricity', size: 1 },
            type: 'technology',
          }}
        ></ProgressCard>
        <ProgressCard
          card={{
            title: 'Fernwärmenetz',
            image: '/images/fernwaerme.png',
            text: 'Diese Karte allein gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
            explanation:
              'Das Fernwärmenetz transportiert zentral erzeugte Wärme oder Abwärme aus Fabriken oder Kraftwerken über mehrere Kilometer für die eigene Wärmeversorgung zu Hause.',
            price: 7,
            resources: 2,
            energyCharacteristics: { technology: 'Distribution', energy: 'Heat', size: 2 },
            type: 'technology',
          }}
        ></ProgressCard>
        <ProgressCard
          card={{
            title: 'Großer Wasserstoffspeicher',
            image: '/images/wasserstoffspeicher.png',
            text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
            explanation: 'Mit Hilfe von Wasserstoff kann Energie gespeichert werden.',
            price: 10,
            resources: 4,
            energyCharacteristics: { technology: 'Storage', energy: 'Electricity', size: 4 },
            type: 'technology',
          }}
        ></ProgressCard>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <ProgressCardSmall
          card={{
            title: 'Photovoltaik auf dem Dach',
            image: '/images/photovoltaik.png',
            text: 'Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden.',
            explanation: 'Photovoltaik generiert aus Sonnenlicht Strom.',
            basePoints: 2,
            systemPoints: 5,
            price: 1,
            resources: 1,
            energyCharacteristics: { technology: 'Generation', energy: 'Electricity', size: 1 },
            type: 'technology',
          }}
        ></ProgressCardSmall>
        <ProgressCardSmall
          card={{
            title: 'Fernwärmenetz',
            image: '/images/fernwaerme.png',
            text: 'Diese Karte allein gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem.',
            explanation:
              'Das Fernwärmenetz transportiert zentral erzeugte Wärme oder Abwärme aus Fabriken oder Kraftwerken über mehrere Kilometer für die eigene Wärmeversorgung zu Hause.',
            price: 7,
            resources: 2,
            energyCharacteristics: { technology: 'Distribution', energy: 'Heat', size: 2 },
            type: 'technology',
          }}
        ></ProgressCardSmall>
        <ProgressCardSmall
          card={{
            title: 'Großer Wasserstoffspeicher',
            image: '/images/wasserstoffspeicher.png',
            text: 'Überschüssige Energie wird im Sommer für den Winter gespeichert.',
            explanation: 'Mit Hilfe von Wasserstoff kann Energie gespeichert werden.',
            price: 10,
            resources: 4,
            energyCharacteristics: { technology: 'Storage', energy: 'Electricity', size: 4 },
            type: 'technology',
          }}
        ></ProgressCardSmall>
      </div>
    </div>
  );
}
