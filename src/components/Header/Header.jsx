import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

function Header({
  handleAddClick,
  weatherData,
  currentTemperatureUnit,
  handleToggleSwitchChange,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="header logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__actions">
        <ToggleSwitch
          currentTemperatureUnit={currentTemperatureUnit}
          handleToggleSwitchChange={handleToggleSwitchChange}
        />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-close-button"
        >
          + Add Clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">Onur Erdinc</p>
            <img src={avatar} alt="avatar name" className="header__avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
