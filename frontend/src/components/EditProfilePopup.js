import { useEffect, useContext } from "react";
import useValidation from "../utils/useValidation";

// IMPORT COMPONENTS
import PopupWithForm from "./PopupWithForm";

// IMPORT CONTEXT
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// EDIT PROFILE POPUP COMPONENT
function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  onLoading,
  onOverlayClick,
}) {
  // VALIDATION CUSTOM HOOK
  const { values, errors, isFormValid, onChange, resetValidation } = useValidation();
  // CONTEXT VARIABLES
  const currentUser = useContext(CurrentUserContext);
  // SET USER DATA TO INPUTS FROM PROFILE
  useEffect(() => {
    resetValidation(true, currentUser);
  }, [currentUser, isOpen, resetValidation]);
  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      onOverlayClick={onOverlayClick}
    >
      <label className="form__input-wrapper">
        <input
          type="text"
          name="name"
          form="edit-profile"
          required
          placeholder="Введите ваше имя"
          minLength="2"
          maxLength="40"
          className={`form__input ${
            errors.name ? "form__input_type_error" : ""
          }`}
          id="name-input"
          onChange={onChange}
          value={values.name || ""}
        />
        <span
          className={`form__input-error ${
            errors.name ? "form__input-error_active" : ""
          }`}
        >
          {errors.name || ""}
        </span>
      </label>
      <label className="form__input-wrapper">
        <input
          type="text"
          name="about"
          form="edit-profile"
          required
          placeholder="Опишите кто вы"
          minLength="2"
          maxLength="200"
          className={`form__input ${
            errors.about ? "form__input_type_error" : ""
          }`}
          id="about-input"
          onChange={onChange}
          value={values.about || ""}
        />
        <span
          className={`form__input-error ${
            errors.about ? "form__input-error_active" : ""
          }`}
        >
          {errors.about || ""}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
