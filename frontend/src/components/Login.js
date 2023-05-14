import useValidation from "../utils/useValidation";

// IMPORT COMPONENTS
import AuthScreen from "./AuthScreen";

// LOGIN COMPONENT
function Login({ onLogin, onLoading }) {
  // VALIDATION CUSTOM HOOK
  const { values, errors, isFormValid, onChange } = useValidation();
  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }
  return (
    <AuthScreen
      name="login"
      title="Вход"
      buttonText={onLoading ? "Вход..." : "Войти"}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="form__input-wrapper">
        <input
          type="email"
          name="email"
          form="login"
          required
          placeholder="Email"
          className={`form__input form__input_place_authorization ${
            errors.email ? "form__input_type_error" : ""
          }`}
          id="email-input"
          onChange={onChange}
          value={values.email || ""}
        />
        <span
          className={`form__input-error ${
            errors.email ? "form__input-error_active" : ""
          }`}
        >
          {errors.email || ""}
        </span>
      </label>
      <label className="form__input-wrapper">
        <input
          type="password"
          name="password"
          form="login"
          required
          minLength="6"
          placeholder="Пароль"
          className={`form__input form__input_place_authorization ${
            errors.password ? "form__input_type_error" : ""
          }`}
          id="password-input"
          onChange={onChange}
          value={values.password || ""}
        />
        <span
          className={`form__input-error ${
            errors.password ? "form__input-error_active" : ""
          }`}
        >
          {errors.password || ""}
        </span>
      </label>
    </AuthScreen>
  );
}

export default Login;
