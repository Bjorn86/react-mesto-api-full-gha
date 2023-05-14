// HAMBURGER MENU COMPONENT
function HamburgerMenu({ email, isOpen, onLogOut }) {
  return (
    <div className={`hamburger ${isOpen ? "hamburger_active" : ""}`}>
      <p className="hamburger__user-email">{email || ""}</p>
      <button
        type="button"
        className="hamburger__btn-sign-out"
        onClick={onLogOut}
      >
        Выйти
      </button>
    </div>
  );
}

export default HamburgerMenu;
