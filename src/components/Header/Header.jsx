import { useNavigate } from "react-router-dom";
import "./Header.css";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav className="wrapper">
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="./MarvelLogo.png" alt="Marvel Logo" />
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              if (Cookies.get("favorites") !== undefined) {
                const favorite = JSON.parse(Cookies.get("favorites"));
                console.log(favorite);
                if (favorite.comic || favorite.character) {
                  navigate("/favorites");
                } else {
                  alert(
                    "YOU DON'T HAVE ANY COMIC / CHARACTER IN YOUR FAVORITES"
                  );
                }
              } else {
                alert("YOU DON'T HAVE ANY COMIC / CHARACTER IN YOUR FAVORITES");
              }
            }}
          >
            FAVORITES
          </button>
          <button
            onClick={() => {
              navigate("/comics");
            }}
          >
            COMICS
          </button>
          <button
            onClick={() => {
              navigate("/characters");
            }}
          >
            CHARACTERS
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
