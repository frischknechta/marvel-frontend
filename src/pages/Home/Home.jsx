import { useNavigate } from "react-router-dom";
import "./Home.css";

import marvelLogo from "/MarvelLogo.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homePage">
      <div className="bannerHome"></div>
      <div className="wrapper homePageContainer">
        <img src={marvelLogo} alt="Marvel logo" className="logo" />
        <div className="titles">
          <h1>WELCOME TO THE MARVEL UNIVERSE !</h1>
          <h2>WHAT ARE YOU LOOKING FOR ?</h2>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              navigate("/comics");
            }}
          >
            COMICS{" "}
          </button>
          <button
            onClick={() => {
              navigate("/characters");
            }}
          >
            CHARACTERS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
