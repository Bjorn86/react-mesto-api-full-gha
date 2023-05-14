import { Link, Route, Routes } from "react-router-dom";

// NAVIGATION BAR COMPONENT
function NavBar({ email, onHamburgerClick, isOpen, onLogOut }) {
  return (
    <div className="header__nav">
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <p className="header__user-email">{email || ""}</p>
              <button
                type="button"
                className="header__btn-sign-out"
                onClick={onLogOut}
              >
                Выйти
              </button>
              <button
                type="button"
                className={`header__btn-hamburger ${
                  isOpen ? "header__btn-hamburger_type_close" : ""
                }`}
                onClick={onHamburgerClick}
              ></button>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default NavBar;
