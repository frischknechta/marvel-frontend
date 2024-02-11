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
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import Favorites from "./pages/Favorites/Favorites";
library.add(
  faHeart,
  faHeartCircleXmark,
  faMagnifyingGlass,
  faCaretLeft,
  faCaretRight
);

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comic/:comicId" element={<Comic />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/character/:characterId" element={<Character />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
