import Popup from "./Popup";

// IMAGE POPUP COMPONENT
function ImagePopup({ card, onClose }) {
  return (
    <Popup
      isOpen={card}
      onClose={onClose}
      type="img"
    >
      <figure className="popup__figure-wrapper">
          <img src={card?.link} alt={card?.name} className="popup__img" />
          <figcaption className="popup__img-caption">{card?.name}</figcaption>
        </figure>
    </Popup>
  );
}

export default ImagePopup;
