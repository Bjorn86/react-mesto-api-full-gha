import { Outlet } from "react-router-dom";

// IMPORT COMPONENTS
import Footer from "./Footer";
import HamburgerMenu from "./HamburgerMenu";
import Header from "./Header";

// APP LAYOUT COMPONENT
function AppLayout({ email, isOpen, onHamburgerClick, onLogOut }) {
  return (
    <>
      <HamburgerMenu
        email={email}
        isOpen={isOpen}
        onLogOut={onLogOut}
      />
      <Header
        email={email}
        isOpen={isOpen}
        onHamburgerClick={onHamburgerClick}
        onLogOut={onLogOut}
      />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
