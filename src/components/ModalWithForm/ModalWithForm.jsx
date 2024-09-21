import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{buttonText}</h2>
        <button type="button" className="modal__close">
          Close
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
