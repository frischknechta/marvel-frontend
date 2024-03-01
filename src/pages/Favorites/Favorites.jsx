import Cookies from "js-cookie";
import "./Favorites.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ComicPreview from "../../components/ComicPreview/ComicPreview";
import CharacterPreview from "../../components/CharacterPreview/CharacterPreview";
import { Navigate } from "react-router-dom";

const Favorites = ({ token }) => {
  const [favorites, setFavorites] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--79sf29g9cmjg.code.run/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : token ? (
    <div className="favoritesPage">
      <div className="bannerFavorites"></div>
      <div className="title">
        <h1>Favorites</h1>
      </div>
      <div className="wrapper favoritesContainer">
        <div className="favorites">
          <h3>COMICS</h3>
          <div className="comics">
            {favorites.comic.map((comicId) => {
              return (
                <ComicPreview
                  key={comicId}
                  comicId={comicId}
                  setFavorites={setFavorites}
                  token={token}
                />
              );
            })}
          </div>
          <h3>CHARACTERS</h3>
          <div className="characters">
            {favorites.character.map((characterId) => {
              return (
                <CharacterPreview
                  key={characterId}
                  characterId={characterId}
                  setFavorites={setFavorites}
                  token={token}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Favorites;
