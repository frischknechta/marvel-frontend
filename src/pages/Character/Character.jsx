import { useEffect, useState } from "react";
import "./Character.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ComicPreview from "../../components/ComicPreview/ComicPreview";

import { register } from "swiper/element/bundle";
register();

const Character = ({ token, favorites, setFavorites }) => {
  const { characterId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        <div className="visibleXs">
          <h2>{data.name} </h2>

          <div>
            <img
              src={`${data.thumbnail.path}/${"portrait_uncanny"}.${
                data.thumbnail.extension
              }`}
              alt=""
            />
          </div>
          <p>{data.description} </p>
        </div>
      </div>
      <div className="bottomBackground">
        <div className="wrapper bottomContainer">
          <div className="appearsIn">
            <h3>{`${data.name} related comics`}</h3>
            <div className="comicsList">
              <swiper-container
                slides-per-view="1"
                navigation="true"
                pagination="true"
                loop="true"
                autoplay="true"
                breakpoints='{"500": {"slidesPerView": 2}, "750": {"slidesPerView": 3}, "1000": {"slidesPerView": 4}, "1200": {"slidesPerView": 5}}'
              >
                {data.comics.map((comic) => {
                  return (
                    <swiper-slide key={comic}>
                      <ComicPreview
                        comicId={comic}
                        token={token}
                        favorites={favorites}
                        setFavorites={setFavorites}
                      />
                    </swiper-slide>
                  );
                })}
              </swiper-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
