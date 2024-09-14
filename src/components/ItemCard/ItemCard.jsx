function ItemCard({ item }) {
  return (
    <div>
      <h1>{item.name}</h1>
      <img src={item.link} alt={item.link} />
    </div>
  );
}

export default ItemCard;
