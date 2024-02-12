import { useNavigate } from "react-router-dom";
import "./Header.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

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
        <div className="visibleXs">
          <div className="menu">
            <div
              onClick={() => {
                setVisible(!visible);
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-bars" />
            </div>
            <div className={visible ? "visble" : "hidden"}>
              <div className="buttons">
                <button
                  onClick={() => {
                    if (Cookies.get("favorites") !== undefined) {
                      const favorite = JSON.parse(Cookies.get("favorites"));
                      console.log(favorite);
                      if (favorite.comic || favorite.character) {
                        setVisible(false);
                        navigate("/favorites");
                      } else {
                        alert(
                          "YOU DON'T HAVE ANY COMIC / CHARACTER IN YOUR FAVORITES"
                        );
                      }
                    } else {
                      alert(
                        "YOU DON'T HAVE ANY COMIC / CHARACTER IN YOUR FAVORITES"
                      );
                    }
                  }}
                >
                  FAVORITES
                </button>
                <button
                  onClick={() => {
                    setVisible(false);
                    navigate("/comics");
                  }}
                >
                  COMICS
                </button>
                <button
                  onClick={() => {
                    setVisible(false);
                    navigate("/characters");
                  }}
                >
                  CHARACTERS
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
