import { useContext, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditProfileModal({ isOpen, onClose, onProfileSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleProfileSubmit(e) {
    e.preventDefault();
    onProfileSubmit({ name, avatar });
  }

  return (
    <ModalWithForm
      buttonText="Save Changes"
      title="Change Profile Data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleProfileSubmit}
      className="modal__save-button"
    >
      <label htmlFor="name" className="modal__label">
        Name *{" "}
        <input
          required
          value={name}
          autoComplete="off"
          type="text"
          className="modal__input"
          id="modal-name"
          placeholder="Enter your name"
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar *{" "}
        <input
          required
          value={avatar}
          autoComplete="off"
          type="url"
          className="modal__input"
          id="modal-avatar"
          placeholder="Enter avatar URL"
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}
