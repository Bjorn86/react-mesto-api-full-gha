import { Link } from "react-router-dom";

// NOT FOUND COMPONENT
function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__title">404 - Страница не найдена</h1>
      <p className="not-found__description">
        Извините, страница которую вы&nbsp;ищите не&nbsp;найдена.
      </p>
      <Link to={"/"} className="not-found__link">
        Вернуться на&nbsp;главную
      </Link>
    </section>
  );
}

export default NotFound;
