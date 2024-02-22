import { useNavigate } from "react-router-dom";
import "./Header.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";

const Header = ({ token, setUser }) => {
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
          {token ? (
            <button
              onClick={async () => {
                const response = await axios.get(
                  "https://site--marvel-backend--79sf29g9cmjg.code.run/favorites",
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                const favorites = response.data;
                console.log(favorites);
                if (
                  favorites.comic.length > 0 ||
                  favorites.character.length > 0
                ) {
                  navigate("/favorites");
                } else {
                  alert(
                    "YOU DON'T HAVE ANY COMIC / CHARACTER IN YOUR FAVORITES"
                  );
                }
              }}
            >
              FAVORITES
            </button>
          ) : (
            ""
          )}
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
          {token ? (
            <button
              onClick={() => {
                setUser();
              }}
            >
              LOG OUT
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                SIGN UP
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                }}
              >
                LOG IN
              </button>
            </>
          )}
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
                {token ? (
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
                ) : (
                  ""
                )}
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
                {token ? (
                  <button
                    onClick={() => {
                      setUser();
                      setVisible(false);
                    }}
                  >
                    LOG OUT
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setVisible(false);
                        navigate("/signup");
                      }}
                    >
                      SIGN UP
                    </button>
                    <button
                      onClick={() => {
                        setVisible(false);
                        navigate("/login");
                      }}
                    >
                      LOG IN
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
