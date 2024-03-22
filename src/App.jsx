import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Comics from "./pages/Comics/Comics";
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Character/Character";
import Comic from "./pages/Comic/Comic";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faHeartCircleXmark,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Favorites from "./pages/Favorites/Favorites";
import Footer from "./components/Footer/Footer";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
library.add(faHeart, faHeartCircleXmark, faMagnifyingGlass, faBars);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  const getFavorites = async () => {
    const response = await axios.get(
      "https://site--marvel-backend--79sf29g9cmjg.code.run/favorites",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setFavorites(response.data);
  };

  const [favorites, setFavorites] = useState(token ? getFavorites : null);

  return (
    <>
      <Router>
        <Header token={token} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/comics"
            element={
              <Comics
                token={token}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route path="/comic/:comicId" element={<Comic />} />
          <Route
            path="/characters"
            element={
              <Characters
                token={token}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route
            path="/character/:characterId"
            element={
              <Character
                token={token}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route path="/favorites" element={<Favorites token={token} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
