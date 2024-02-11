import "./ComicPreview.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ComicPreview = ({ comicId }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--79sf29g9cmjg.code.run/comic/${comicId}`
        );
        console.log("Comic Preview fetchData", response.data);
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
