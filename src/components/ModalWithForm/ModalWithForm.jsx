import "./ModalWithForm.css";
import CloseButton from "../../assets/CloseButton.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  buttonClass = "modal__submit",
  redirectButton,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={CloseButton} alt="Close button" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons-wrapper">
            <button type="submit" className={buttonClass}>
              {buttonText}
            </button>
            {redirectButton && redirectButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
