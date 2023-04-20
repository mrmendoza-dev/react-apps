import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Wikipedia.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";

function Wikipedia() {
  const [articleData, setArticleData] = useState({
    pageid: 0,
    title: "",
    extract: "",
  });

  function randomUrl() {
    axios
      .get(
        "https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1&origin=*"
      )
      .then((response) => {
        const pageId = response.data.query.random[0].id;
        axios
          .get(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&pageids=${pageId}&origin=*`
          )
          .then((response) => {
            const pageData = response.data.query.pages[pageId];
            console.log(pageData);
            setArticleData(pageData);
          });
      });
  }

  useEffect(() => {
    randomUrl();
  }, []);

  return (
    <div className="Wikipedia">
      <h3>Wikipedia</h3>
      <button className="btn-refresh" onClick={randomUrl}>
        <FontAwesomeIcon icon={icons.faRotateRight} />
      </button>
      <a
        href={`https://en.wikipedia.org/wiki/?curid=${articleData.pageid}`}
        className="title"
        target="_blank"
        rel="noreferrer noopener"
      >
        {articleData.title}
      </a>
      <p className="description">{articleData.extract}</p>
    </div>
  );
}

export default Wikipedia;
