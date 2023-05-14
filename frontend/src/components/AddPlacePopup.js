import { useEffect } from "react";
import useValidation from "../utils/useValidation";

// IMPORT COMPONENTS
import PopupWithForm from "./PopupWithForm";

// ADD PLACE POPUP COMPONENT
function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  onLoading,
  onOverlayClick,
}) {
  // VALIDATION CUSTOM HOOK
  const { values, errors, isFormValid, onChange, resetValidation } = useValidation();
  // RESET INPUTS VALUE
  useEffect(() => {
    resetValidation();
  }, [isOpen, resetValidation]);
  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={onLoading ? "Сохранение..." : "Создать"}
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
          form="add-card"
          required
          placeholder="Название"
          minLength="2"
          maxLength="30"
          className={`form__input ${
            errors.name ? "form__input_type_error" : ""
          }`}
          id="place-input"
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
          type="url"
          name="link"
          form="add-card"
          required
          placeholder="Ссылка на картинку"
          className={`form__input ${
            errors.link ? "form__input_type_error" : ""
          }`}
          id="link-input"
          onChange={onChange}
          value={values.link || ""}
        />
        <span
          className={`form__input-error ${
            errors.link ? "form__input-error_active" : ""
          }`}
        >
          {errors.link || ""}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
