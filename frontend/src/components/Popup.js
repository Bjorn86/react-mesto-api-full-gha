import { useEffect, useCallback } from "react";

// POPUP COMPONENT
function Popup({ isOpen, onClose, type, ...props }) {
  // HANDLE CLOSE POPUP BY ESC BUTTON
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      return () => document.removeEventListener("keydown", handleEscClose);
    }
  }, [onClose, isOpen]);
  // HANDLE CLOSE BY CLICK ON OVERLAY
  const closeByClickOnOverlay = useCallback(
    (evt) => {
      if (evt.target === evt.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${type}`}
      onMouseDown={closeByClickOnOverlay}
    >
      <div className={`popup__container popup__container_type_${type}`}>
        {props.children}
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Popup;
