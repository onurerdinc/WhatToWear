import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h1 className="card__name">{item.name}</h1>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.link}
      />
    </li>
  );
}

export default ItemCard;
