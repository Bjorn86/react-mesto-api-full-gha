import { useContext } from "react";

// IMPORT CONTEXT
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// CARD COMPONENT
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // CONTEXT VARIABLES
  const currentUser = useContext(CurrentUserContext);
  // OTHER VARIABLES
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((item) => item === currentUser._id);
  // HANDLE CARD IMAGE CLICK
  function handleClick() {
    onCardClick(card);
  }
  // HANDLE LIKE CLICK
  function handleLikeClick() {
    onCardLike(card);
  }
  // HANDLE DELETE CLICK
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <li className="card">
      {isOwn && (
        <button
          type="button"
          className="card__btn-del"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="card__img"
        onClick={handleClick}
      />
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            className={`card__btn-like${
              isLiked ? " card__btn-like_active" : ""
            }`}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
