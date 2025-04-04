import ProgressCard from '../components/ProgressCard';

export default function Play() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ProgressCard
        title="Photovoltaik auf dem Dach"
        image="/images/photovoltaik.png"
        text="Um das volle Potenzial nutzen zu können, muss in sonnenreichen Stunden Strom gespeichert werden."
        explanation="Photovoltaik generiert aus Sonnenlicht Strom."
        basePoints={2}
        systemPoints={5}
        price={1}
        resources={1}
        type={{
          technology: 'Generation',
          energy: 'Electricity',
          size: 1,
        }}
      ></ProgressCard>
      <ProgressCard
        title="Fernwärmenetz"
        image="/images/fernwaerme.png"
        text="Diese Karte allein gibt keine Punkte. Ein stabiles Energieverteilungsnetz ist eine Grundvoraussetzung für das Energiesystem."
        explanation="Das Fernwärmenetz transportiert zentral erzeugte Wärme oder Abwärme aus Fabriken oder Kraftwerken über mehrere Kilometer für die eigene Wärmeversorgung zu Hause."
        price={7}
        resources={2}
        type={{
          technology: 'Distribution',
          energy: 'Heat',
          size: 2,
        }}
      ></ProgressCard>
      <ProgressCard
        title="Großer Wasserstoffspeicher"
        image="/images/wasserstoffspeicher.png"
        text="Überschüssige Energie wird im Sommer für den Winter gespeichert."
        explanation="Mit Hilfe von Wasserstoff kann Energie gespeichert werden."
        price={10}
        resources={4}
        type={{
          technology: 'Storage',
          energy: 'Electricity',
          size: 4,
        }}
      ></ProgressCard>
    </div>
  );
}
