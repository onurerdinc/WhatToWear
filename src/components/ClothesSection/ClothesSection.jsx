import { defaultClothingItems } from "../../utils/constants.js";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

function ClothesSection({
  handleAddClick,
  handleCardClick,
  clothingItems,
  isLiked,
  handleCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(currentUser);

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
        {clothingItems &&
          clothingItems
            .filter((item) => item.owner === currentUser._id)
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  handleCardClick={handleCardClick}
                  isLiked={isLiked}
                  handleCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              );
            })}
      </ul>
    </div>
  );
}

export default ClothesSection;
