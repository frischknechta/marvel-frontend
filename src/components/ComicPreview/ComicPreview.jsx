import "./ComicPreview.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicPreview = ({ comicId, favorites, setFavorites, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleAddFavorite = async () => {
    try {
      const response = await axios.post(
        "https://site--marvel-backend--79sf29g9cmjg.code.run/favorites/add",
        {
          comicId: comicId,
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
          comicId: comicId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("DELETE>>>>>>>>", response.data);
      setFavorites(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--79sf29g9cmjg.code.run/comic/${comicId}`
        );
        // console.log("Comic Preview fetchData", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="comicPreview">
      {token ? (
        <div>
          {favorites.comic.includes(comicId) ? (
            <button className="comicCardButton" onClick={handleRemoveFavorite}>
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
      <Link to={`/comic/${comicId}`}>
        <div className="comicPreviewContainer">
          <img
            src={`${data.thumbnail.path}/${"standard_medium"}.${
              data.thumbnail.extension
            }`}
            alt="Marvel comic cover picture"
          />
          <div>{data.title}</div>
        </div>
      </Link>
    </div>
  );
};

export default ComicPreview;
