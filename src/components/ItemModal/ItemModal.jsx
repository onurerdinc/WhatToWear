import "./ItemModal.css";
import CloseButton from "../../assets/CloseButton.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, handleCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwner ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;
  return (
    <div className={`modal ${isOpen === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={CloseButton} alt="closeButton"></img>
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__caption-weather-container">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            className={itemDeleteButtonClassName}
            onClick={handleCardDelete}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
