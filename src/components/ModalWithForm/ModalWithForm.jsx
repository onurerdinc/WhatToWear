import "./ModalWithForm.css";
import CloseButton from "../../assets/CloseButton.svg";

function ModalWithForm({ children, buttonText, title, onClose, isOpen }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{buttonText}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={CloseButton} alt="closeButton"></img>
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {title}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
