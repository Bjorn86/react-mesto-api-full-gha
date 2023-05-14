import { useEffect } from "react";
import useValidation from "../utils/useValidation";

// IMPORT COMPONENTS
import PopupWithForm from "./PopupWithForm";

// EDIT AVATAR POPUP COMPONENT
function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  onLoading,
  onOverlayClick,
}) {
  // VALIDATION CUSTOM HOOK
  const { values, errors, isFormValid, onChange, resetValidation } = useValidation();
  // RESET INPUT VALUE
  useEffect(() => {
    resetValidation();
  }, [isOpen, resetValidation]);
  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }
  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      onOverlayClick={onOverlayClick}
    >
      <label className="popup__input-wrapper">
        <input
          type="url"
          name="avatar"
          form="avatar-edit"
          required
          placeholder="Ссылка на картинку"
          className={`form__input ${
            errors.avatar ? "form__input_type_error" : ""
          }`}
          id="avatar-link-input"
          onChange={onChange}
          value={values.avatar || ""}
        />
        <span
          className={`form__input-error ${
            errors.avatar ? "form__input-error_active" : ""
          }`}
        >
          {errors.avatar || ""}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
