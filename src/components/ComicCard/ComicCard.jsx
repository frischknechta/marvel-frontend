import { Link } from "react-router-dom";
import "./ComicCard.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicCard = ({ comic, favorites, setFavorites }) => {
  const handleAddFavorite = () => {
    const newObj = { ...favorites };
    newObj.comic.push(comic._id);
    Cookies.set("favorites", JSON.stringify(newObj));
    setFavorites(JSON.parse(Cookies.get("favorites")));
  };

  const handleRemoveFavorite = () => {
    const index = favorites.comic.indexOf(comic._id);
    favorites.comic.splice(index, 1);
    Cookies.set("favorites", JSON.stringify(favorites));
    setFavorites(JSON.parse(Cookies.get("favorites")));
  };

  return (
    <>
      <div className="comicCard">
        <div>
          {favorites.comic.includes(comic._id) ? (
            <button className="comicCardButton" onClick={handleRemoveFavorite}>
              <FontAwesomeIcon icon="heart-circle-xmark" />
            </button>
          ) : (
            <button className="comicCardButton" onClick={handleAddFavorite}>
              <FontAwesomeIcon icon="heart" />
            </button>
          )}
        </div>
        <Link to={`/comic/${comic._id}`}>
          <div className="comicCardContainer">
            <img
              src={`${comic.thumbnail.path}/${"standard_large"}.${
                comic.thumbnail.extension
              }`}
              alt="Marvel comic cover picture"
            />
            <div>{comic.title}</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ComicCard;
