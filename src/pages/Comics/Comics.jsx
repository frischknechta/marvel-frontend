import { useEffect, useState } from "react";
import "./Comics.css";
import axios from "axios";
import ComicCard from "../../components/ComicCard/ComicCard";
import Pagination from "rc-pagination";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState(
    Cookies.get("favorites")
      ? JSON.parse(Cookies.get("favorites"))
      : { comic: [], character: [] }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--79sf29g9cmjg.code.run/comics?title=${search}&page=${page}`
        );
        console.log("COMICS fetchData", response.data);
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
    <div className="comicsPage">
      <div className="bannerComics"></div>
      <div className="title">
        <h1>Comics page</h1>
      </div>
      <div className="wrapper">
        <div className="filters">
          <label htmlFor="searchBar">
            <FontAwesomeIcon icon="magnifying-glass" />
            <input
              type="search"
              name="searchBar"
              id="searchBar"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
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
        <div className="comicsContainer">
          {data.results.map((comic) => {
            return (
              <ComicCard
                key={comic._id}
                comic={comic}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comics;
