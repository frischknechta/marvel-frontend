import { useParams } from "react-router-dom";
import "./Comic.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Comic = () => {
  const { comicId } = useParams();

  console.log("ID>>>>", comicId);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--79sf29g9cmjg.code.run/comic/${comicId}`
        );
        console.log("COMIC fetchData", response.data);
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
    <div className="wrapper">
      <div className="comicInfo">
        <div className="description">
          <h2>{data.title} </h2>
          <p>{data.description} </p>
        </div>{" "}
        <div>
          <img
            src={`${data.thumbnail.path}/${"portrait_uncanny"}.${
              data.thumbnail.extension
            }`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Comic;
