import Cookies from "js-cookie";
import "./Favorites.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ComicPreview from "../../components/ComicPreview/ComicPreview";
import CharacterPreview from "../../components/CharacterPreview/CharacterPreview";

const Favorites = () => {
  const favorites = JSON.parse(Cookies.get("favorites"));
  console.log("FAVORITES>>>>", favorites);

  return (
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
              return <ComicPreview key={comicId} comicId={comicId} />;
            })}
          </div>
          <h3>CHARACTERS</h3>
          <div className="characters">
            {favorites.character.map((characterId) => {
              return (
                <CharacterPreview key={characterId} characterId={characterId} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
