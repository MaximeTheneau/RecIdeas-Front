import Card from './CardLink';

export default function Cards({ cards }) {
  return (
    <ul className="flex justify-around">
      {cards.map((card) => (
        <Card
          key={card.title}
          card={card}
        />
      ))}
    </ul>
  );
}
