import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

function ClothesSection({
  handleAddClick,
  handleCardClick,
  clothingItems,
  isLiked,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item?.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__items-title">Your Items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item?._id}
              item={item}
              handleCardClick={handleCardClick}
              onCardLike={onCardLike}
              isLiked={isLiked}
              isLoggedIn={isLoggedIn}
            />
          ))
        ) : (
          <p>No items found</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
