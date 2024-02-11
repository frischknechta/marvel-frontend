import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homePage">
      <div className="bannerHome"></div>
      <div className="wrapper homePageContainer">
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
