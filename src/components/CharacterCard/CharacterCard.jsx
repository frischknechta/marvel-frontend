import { Link } from "react-router-dom";
import "./CharacterCard.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const CharacterCard = ({ character, favorites, setFavorites, token }) => {
  const handleAddFavorite = async () => {
    try {
      const response = await axios.post(
        "https://site--marvel-backend--79sf29g9cmjg.code.run/favorites/add",
        {
          characterId: character._id,
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
          characterId: character._id,
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
      <div className="characterCard">
        {token ? (
          <div>
            {favorites.character.includes(character._id) ? (
              <button
                className="characterCardButton"
                onClick={handleRemoveFavorite}
              >
                <FontAwesomeIcon icon="heart-circle-xmark" />
              </button>
            ) : (
              <button
                className="characterCardButton"
                onClick={handleAddFavorite}
              >
                <FontAwesomeIcon icon="heart" />
              </button>
            )}
          </div>
        ) : (
          ""
        )}
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
