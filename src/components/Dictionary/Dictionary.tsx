import { useEffect, useState } from "react";
import "./index.scss";

function Dictionary() {
  const dictionaryKey = "a6ee5012-0997-482f-968b-1fc532f34cb2";
  const thesaurusKey = "2db543c6-e9ff-44b1-b411-6822e8f9121f";

  const [word, setWord] = useState("ethereal");
  const [wordData, setWordData] = useState({
    word: "ethereal",
    fl: "adjective",
    hwi: "ethe·​re·​al",
    definition: [
      "of or relating to the regions beyond the earth",
      "celestial, heavenly",
      "unworldly, spiritual",
    ],
  });

  const handleChange = (event: any) => {
    setWord(event.target.value);
  };

  useEffect(() => {
    getDictionaryResult();
  }, []);

  function getDictionaryResult() {
    fetch(
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictionaryKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        let wordChunk = data[0];

        // console.log(wordChunk);

        // console.log(wordChunk.shortdef);

        let newWord = {
          word: word,
          fl: wordChunk.fl,
          hwi: wordChunk.hwi.hw,
          definition: wordChunk.shortdef,
        };

        setWordData(newWord);
      });
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    getDictionaryResult();
  };

  return (
    <div className="Dictionary">
      <form onSubmit={handleSubmit}>
        <input type="text" value={word} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      <p className="">{wordData.word}</p>

      <p className="">{wordData.fl}</p>
      <p className="">{wordData.hwi}</p>

      {wordData.definition.map((def) => {
        return (
          <p key={def} className="">
            {def}
          </p>
        );
      })}
    </div>
  );
}

export default Dictionary;
