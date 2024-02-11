import { useEffect, useState } from "react";
import "./Character.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ComicPreview from "../../components/ComicPreview/ComicPreview";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Character = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--79sf29g9cmjg.code.run/character/${characterId}`
        );
        console.log("CHARACTER fetchData", response.data);
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
    <div className="characterPage">
      <div className="wrapper">
        <div className="characterInfo">
          <div className="description">
            <h2>{data.name} </h2>
            <p>{data.description} </p>
          </div>
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
      <div className="bottomBackground">
        <div className="wrapper bottomContainer">
          <div className="appearsIn">
            <h3>{`${data.name} related comics`}</h3>
            <div className="comicsList">
              <Carousel responsive={responsive} infinite={true} centerMode>
                {data.comics.map((comic) => {
                  return <ComicPreview key={comic} comicId={comic} />;
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
