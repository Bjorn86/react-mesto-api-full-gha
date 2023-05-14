// PRELOADER COMPONENT
function Preloader({ isActive }) {
  return (
    <div className={`preloader ${isActive ? "preloader_active" : ""}`}></div>
  );
}

export default Preloader;
