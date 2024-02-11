import "./CharacterPreview.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CharacterPreview = ({ characterId }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--79sf29g9cmjg.code.run/character/${characterId}`
        );
        console.log("character Preview fetchData", response.data);
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
    <div className="characterPreview">
      <Link to={`/character/${characterId}`}>
        <div className="characterPreviewContainer">
          <img
            src={`${data.thumbnail.path}/${"standard_medium"}.${
              data.thumbnail.extension
            }`}
            alt="Marvel character cover picture"
          />
          <div>{data.name}</div>
        </div>
      </Link>
    </div>
  );
};

export default CharacterPreview;
