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
  console.log(clothingItems);
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  const userItems = clothingItems.filter(
    (item) => item?.owner === currentUser?._id
  );
  console.log(userItems);

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
              key={item?.data._id}
              item={item.data}
              handleCardClick={handleCardClick}
              handleCardLike={handleCardLike}
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
