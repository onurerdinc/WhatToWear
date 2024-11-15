import "../ItemCard/ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLoggedIn = !!currentUser?._id;

  const isLiked = item.likes.some((_id) => _id === currentUser?._id);
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLike = () => {
    onCardLike({ _id: item?._id, isLiked: isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__name">{item?.name}</h2>
        {isLoggedIn && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
