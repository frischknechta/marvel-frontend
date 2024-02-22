import { Link } from "react-router-dom";
import "./ComicCard.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const ComicCard = ({ comic, favorites, setFavorites, token }) => {
  const handleAddFavorite = async () => {
    try {
      const response = await axios.post(
        "https://site--marvel-backend--79sf29g9cmjg.code.run/favorites/add",
        {
          comicId: comic._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setFavorites(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const response = await axios.post(
        "https://site--marvel-backend--79sf29g9cmjg.code.run/favorites/delete",
        {
          comicId: comic._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setFavorites(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="comicCard">
        {token ? (
          <div>
            {favorites.comic.includes(comic._id) ? (
              <button
                className="comicCardButton"
                onClick={handleRemoveFavorite}
              >
                <FontAwesomeIcon icon="heart-circle-xmark" />
              </button>
            ) : (
              <button className="comicCardButton" onClick={handleAddFavorite}>
                <FontAwesomeIcon icon="heart" />
              </button>
            )}
          </div>
        ) : (
          ""
        )}
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
