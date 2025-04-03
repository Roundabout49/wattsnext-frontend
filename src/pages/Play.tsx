import ProgressCard from '../components/ProgressCard';

export default function Play() {
  return (
    <div>
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
          type: 'Electricity',
          size: 1,
        }}
      ></ProgressCard>
    </div>
  );
}
