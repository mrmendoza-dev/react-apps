import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { icons } from "../../assets/icons";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./CryptoModule.scss";
import axios from "axios";

const CryptoModule = () => {
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [favorites, setFavorites] = useLocalStorage("cryptoFavorites", []);
  const [showFavorites, setShowFavorites] = useLocalStorage(
    "cryptoCurrentTab",
    false
  );

  function updateCrypto() {
    const API_URL = "https://api.coingecko.com/api/v3";
    let url = `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`;

    axios
      .get(url)
      .then((response) => {
        setCryptoData(response.data);
      })
      .catch((error) => {
        console.error(error);
        fetch("./data/cryptoData.json")
          .then((res) => {
            if (!res.ok) {
              throw Error("Something went wrong");
            }
            return res.json();
          })
          .then((data) => {
            setCryptoData(data);
          })
          .catch((err) => {
            console.error(err);
          });
      });
  }

  useEffect(() => {
    updateCrypto();
  }, []);

  const toggleFavorite = (crypto: any) => {
    const favoriteIndex = favorites.findIndex(
      (fav: any) => fav.id === crypto.id
    );

    if (favoriteIndex === -1) {
      setFavorites([...favorites, crypto]);
    } else {
      const newFavorites = favorites.filter((fav: any) => fav.id !== crypto.id);
      setFavorites(newFavorites);
    }
  };

  const displayedCryptos = showFavorites ? favorites : cryptoData;

  return (
    <div className="CryptoModule">
      <div className="tabs">
        <button
          className={!showFavorites ? "active" : ""}
          onClick={() => {
            setShowFavorites(false);
            localStorage.setItem("showFavorites", JSON.stringify(false));
          }}
        >
          <FontAwesomeIcon icon={icons.faList} />
        </button>
        <button
          className={showFavorites ? "active" : ""}
          onClick={() => {
            setShowFavorites(true);
            localStorage.setItem("showFavorites", JSON.stringify(true));
          }}
        >
          <FontAwesomeIcon icon={icons.faStarFilled} />
        </button>
      </div>

      {displayedCryptos === null ? (
        <div className="loading"></div>
      ) : (
        <div className="crypto-list-wrapper">
          <div className="crypto-list">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>24h</th>
                </tr>
              </thead>
              <tbody>
                {displayedCryptos.map((crypto: any) => {
                  const isFavorite = favorites.some(
                    (fav: any) => fav.id === crypto.id
                  );
                  return (
                    <tr key={crypto.id} className="crypto-row">
                      <td>
                        <button
                          className={`favorite-btn ${
                            isFavorite ? "favorited" : ""
                          }`}
                          onClick={() => toggleFavorite(crypto)}
                        >
                          <FontAwesomeIcon
                            icon={
                              isFavorite
                                ? icons.faStarFilled
                                : icons.faStarEmpty
                            }
                          />
                        </button>
                        <p className="">{crypto.market_cap_rank}</p>
                      </td>

                      <td className="crypto-name">
                        <a
                          href={`https://www.coingecko.com/en/coins/${crypto.id}`}
                          target="_blank"
                          className="flex"
                        >
                          <img className="crypto-logo" src={crypto.image} />
                          <p className="">{crypto.name}</p>
                        </a>
                      </td>

                      <td>${crypto.current_price.toLocaleString()}</td>

                      <td
                        className="crypto-price"
                        style={{
                          color:
                            crypto.market_cap_change_percentage_24h > 0
                              ? "limegreen"
                              : "red",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={
                            crypto.market_cap_change_percentage_24h > 0
                              ? icons.faCaretUp
                              : icons.faCaretDown
                          }
                        />
                        <p>
                          {Math.abs(
                            crypto.market_cap_change_percentage_24h.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )
                          )}
                          %
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoModule;
