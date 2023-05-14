import { useContext } from "react";

// IMPORT COMPONENTS
import Card from "./Card";

// IMPORT CONTEXT
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// MAIN COMPONENT
function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  // CONTEXT VARIABLES
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <button className="profile__btn-avatar-edit" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="Аватар пользователя"
              className="profile__avatar"
            />
          </button>
          <div className="profile__user-wrapper">
            <div className="profile__user-edit">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__btn-edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__user-about">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__btn-add"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards" aria-label="Секция с карточками">
        <ul className="cards__wrapper">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
