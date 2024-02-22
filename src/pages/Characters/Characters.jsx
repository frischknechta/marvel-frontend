import { useEffect, useState } from "react";
import "./Characters.css";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Pagination from "rc-pagination";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ token, favorites, setFavorites }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--79sf29g9cmjg.code.run/characters?name=${search}&page=${page}`
        );
        console.log("CHARACTERS fetchData", response.data);
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, page]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="charactersPage">
      <div className="bannerCharacters"></div>
      <div className="title">
        <h1>Characters page</h1>
      </div>
      <div className="wrapper">
        <div className="filters">
          <label htmlFor="searchBar">
            <FontAwesomeIcon icon="magnifying-glass" />
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </label>
          <div className="pagination">
            <Pagination
              onChange={(page) => {
                setPage(page);
              }}
              current={page}
              total={data.count}
              pageSize={data.limit}
              nextIcon="NEXT >"
              prevIcon="< PREV"
              jumpNextIcon="..."
              jumpPrevIcon="..."
            />
          </div>
        </div>
        <div className="charactersContainer">
          {data.results.map((character) => {
            return (
              <CharacterCard
                key={character._id}
                character={character}
                favorites={favorites}
                setFavorites={setFavorites}
                token={token}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Characters;
