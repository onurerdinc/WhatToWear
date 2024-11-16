import React from "react";
import "../ItemCard/ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useContext } from "react";
import LikeImage from "..//../assets/LikeImage.png";
import LikedImage from "../../assets/LikedImage.png";

const ItemCard = ({ item, onCardClick, isLoggedIn, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  return (
    <div className="cards__container">
      <div className="cards__item_container">
        <div className="cards__item_top-wrapper">
          <div className="cards__title_frame">
            <h2 className="cards__title">{item.name}</h2>
          </div>
          {isLoggedIn ? (
            <button
              onClick={() => onCardLike(item._id, isLiked)}
              className="cards__like-wrapper"
            >
              <img
                src={isLiked ? LikedImage : LikeImage}
                alt="like button"
                className="cards__like"
              />
            </button>
          ) : (
            ""
          )}
        </div>
        <img
          className="cards__image"
          alt={item.name}
          src={item.imageUrl}
          onClick={() => onCardClick(item)}
        ></img>
      </div>
    </div>
  );
};

export default ItemCard;
