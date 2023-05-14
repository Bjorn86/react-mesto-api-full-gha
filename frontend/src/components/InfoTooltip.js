// IMPORT COMPONENTS
import Popup from "./Popup";

// INFORMATION TOOLTIP COMPONENT
function InfoTooltip({ isOpen, onClose, status }) {
  // HANDLE CLASS TOGGLE
  function handleClassToggle(status) {
    if (status === "success") {
      return "popup__status-icon_type_success";
    } else if (status === "fail") {
      return "popup__status-icon_type_fail";
    } else {
      return "";
    }
  }
  // HANDLE TEXT TOGGLE
  function handleTextToggle(status) {
    if (status === "success") {
      return "Вы успешно зарегистрировались!";
    } else if (status === "fail") {
      return "Что-то пошло не так! Попробуйте ещё раз.";
    } else {
      return "";
    }
  }
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      type="form"
    >
      <div className="popup__status-wrapper">
        <div
          className={`popup__status-icon ${handleClassToggle(status)}`}
        ></div>
        <p className="popup__status-text">{handleTextToggle(status)}</p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
