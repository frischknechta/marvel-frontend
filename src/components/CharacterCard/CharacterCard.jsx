import { Link } from "react-router-dom";
import "./CharacterCard.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CharacterCard = ({ character, favorites, setFavorites }) => {
  const handleAddFavorite = () => {
    const newObj = { ...favorites };
    newObj.character.push(character._id);
    Cookies.set("favorites", JSON.stringify(newObj));
    setFavorites(JSON.parse(Cookies.get("favorites")));
  };

  const handleRemoveFavorite = () => {
    const index = favorites.character.indexOf(character._id);
    favorites.character.splice(index, 1);
    Cookies.set("favorites", JSON.stringify(favorites));
    setFavorites(JSON.parse(Cookies.get("favorites")));
  };

  return (
    <>
      <div className="characterCard">
        <div>
          {favorites.character.includes(character._id) ? (
            <button
              className="characterCardButton"
              onClick={handleRemoveFavorite}
            >
              <FontAwesomeIcon icon="heart-circle-xmark" />
            </button>
          ) : (
            <button className="characterCardButton" onClick={handleAddFavorite}>
              <FontAwesomeIcon icon="heart" />
            </button>
          )}
        </div>
        <Link to={`/character/${character._id}`}>
          <div className="characterCardContainer">
            <img
              src={`${character.thumbnail.path}/${"standard_large"}.${
                character.thumbnail.extension
              }`}
              alt="Marvel character picture"
            />
            <div>{character.name}</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CharacterCard;
