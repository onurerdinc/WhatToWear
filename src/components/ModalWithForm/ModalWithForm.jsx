import "./ModalWithForm.css";
import CloseButton from "../../assets/CloseButton.svg";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{buttonText}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={CloseButton} alt="closeButton"></img>
        </button>
        {children}
        <form className="modal__form">
          <button type="submit" className="modal__submit">
            {title}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
