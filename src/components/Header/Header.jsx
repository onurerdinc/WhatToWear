import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="header logo" />
      <p className="header__date-and-location">Date, Location</p>
      <button className="header__add-close-button">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="avatar name" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
