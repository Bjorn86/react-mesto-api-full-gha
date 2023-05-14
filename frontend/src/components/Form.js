//
function Form({ name, buttonText, onSubmit, isFormValid, ...props }) {
  return (
    <form
      action="#"
      name={`${name}`}
      id={`${name}`}
      className={`form form_type_${name} ${
        name === "login" || name === "registr"
          ? "form_place_authorization"
          : ""
      }`}
      noValidate
      onSubmit={onSubmit}
    >
      {props.children}
      <button
        type="submit"
        form={`${name}`}
        className={`form__btn-submit ${
          name === "login" || name === "registr"
            ? "form__btn-submit_place_authorization"
            : ""
        }`}
        disabled={isFormValid ? false : true}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
