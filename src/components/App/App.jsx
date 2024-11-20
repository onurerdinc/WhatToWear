import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates } from "../../utils/constants";
import { APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import {
  getItems,
  addItem,
  addCardLike,
  deleteItem,
  getUserInfo,
  removeCardLike,
} from "../../utils/api.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import * as auth from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterRoute = () => {
    setActiveModal("register");
  };

  const handleLoginRoute = () => {
    setActiveModal("login");
  };

  const onSignUp = ({ name, email, password, avatar }) => {
    const userProfile = { name, email, password, avatar };
    auth.register(userProfile).then((res) => {
      onLogin({ email, password });
      closeActiveModal();
    });
  };

  const onLogin = ({ email, password }) => {
    auth.login({ email, password }).then((res) => {
      localStorage.setItem("jwt", res.token);
      auth.getUserProfile(res.token).then((userProfile) => {
        setCurrentUser(userProfile);
        setIsLoggedIn(true);
      });
      closeActiveModal();
      navigate("/profile");
    });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closeActiveModal();
    navigate("/");
  };

  const handleCardLike = (_id, isLiked) => {
    const token = localStorage.getItem("jwt");
    return !isLiked
      ? addCardLike(_id, token).then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === _id ? { ...item, likes: updatedCard.likes } : item
            )
          );
          setIsLiked(true);
        })
      : removeCardLike(_id, token).then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === _id ? { ...item, likes: updatedCard.likes } : item
            )
          );
          setIsLiked(false);
        });
  };

  const handleCardDelete = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item?._id !== selectedCard?._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit");
  };

  const handleDeleteCardClick = () => {
    setActiveModal("delete-confirmation");
  };

  const onProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    auth
      .editProfile({ name, avatar }, token)
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res });
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleOnAddItem = async (newItem) => {
    const token = localStorage.getItem("jwt");
    const addedItem = await addItem(newItem, token);
    setClothingItems((prevItems) => [addedItem.data, ...prevItems]);
    closeActiveModal();
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.addEventListener("click", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getUserProfile()
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSignupClick={handleSignupClick}
              handleLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLiked={isLiked}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      onSignOut={onSignOut}
                      handleEditProfileClick={handleEditProfileClick}
                      isLiked={isLiked}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            addItem={handleOnAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            handleCardDelete={handleDeleteCardClick}
          />
          <DeleteModal
            isOpen={activeModal}
            onClose={closeActiveModal}
            handleCardDelete={handleCardDelete}
            selectedCard={selectedCard}
          />
        </CurrentTemperatureUnitContext.Provider>

        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onRegister={onSignUp}
          handleLoginRoute={handleLoginRoute}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={onLogin}
          handleRegisterRoute={handleRegisterRoute}
        />
        <EditProfileModal
          isOpen={activeModal === "edit"}
          onClose={closeActiveModal}
          onProfileSubmit={onProfileSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
