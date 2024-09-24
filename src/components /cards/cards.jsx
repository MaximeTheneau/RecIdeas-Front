import Card from './CardLink';

export default function Cards({ cards }) {
  return (
    <ul className="flex justify-around flex-wrap">
      {cards.map((card) => (
        <Card
          key={card.title}
          card={card}
        />
      ))}
    </ul>
  );
}
