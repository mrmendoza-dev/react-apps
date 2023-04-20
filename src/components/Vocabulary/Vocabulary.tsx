import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { icons } from "../../assets/icons";
import "./Vocabulary.scss";
import axios from "axios";

function Vocabulary() {
    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState("");
    const [isLoading, setIsLoading] = useState(false);

  const dictionaryKey = "a6ee5012-0997-482f-968b-1fc532f34cb2";
  const thesaurusKey = "2db543c6-e9ff-44b1-b411-6822e8f9121f";

  const getWord = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(
          "random"
        )}?key=${dictionaryKey}&vocabularyLevel=hard`
      );
      const wordObj = response.data[0];
      setWord(wordObj.meta.id);
      setDefinition(wordObj.shortdef[0]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getWord();
  }, []);

  return (
    <div>
      <h2>Vocabulary</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            <strong>{word}</strong>: {definition}
          </p>
          <button onClick={getWord}>Get a new word</button>
        </>
      )}
    </div>
  );
}

export default Vocabulary;