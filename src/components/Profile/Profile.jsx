import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({
  handleAddClick,
  onCardClick,
  clothingItems,
  handleEditProfileClick,
  isLiked,
  onCardLike,
  isLoggedIn,
  onSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onSignOut={onSignOut}
          onEditProfileData={handleEditProfileClick}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          isLiked={isLiked}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}
export default Profile;
