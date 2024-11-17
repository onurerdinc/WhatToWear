import React from "react";
import "../Profile/Profile.css";
import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="sidebar__user_avatar"
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditProfileClick}
          type="button"
          className="sidebar__change-profile"
        >
          Change profile data
        </button>
        <button onClick={onSignOut} className="sidebar__logout">
          Log out
        </button>
      </div>
    </div>
  );
}
export default SideBar;
