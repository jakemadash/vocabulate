import React, { useState, useEffect } from "react";
import Word from "./components/Word";
import Selector from "./components/Selector";
import "./style.css";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8bc6f2e1e3msh80403492929db54p161165jsnca3cb7920505",
    "X-RapidAPI-Host": "lexicala1.p.rapidapi.com",
  },
};

const App = () => {
  const [entryCount, setEntryCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("sv");
  const [currentColor, setCurrentColor] = useState("#5B85AA");

  const shuffleResults = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const checkNestedSenses = (senses) => {
    let nested = "";
    senses.forEach((sense) => {
      if (sense.senses) nested = true;
      else nested = false;
    });
    return nested;
  };

  const isValidEntry = (word) => {
    const validPOS = ["noun", "verb", "adjective", "adverb"];
    const nestedSenses = checkNestedSenses(word.senses);
    if (
      validPOS.includes(word.headword.pos) &&
      !nestedSenses &&
      word.senses[0].translations &&
      "en" in word.senses[0].translations &&
      word.senses[0].examples &&
      word.senses[0].examples[0].translations &&
      "en" in word.senses[0].examples[0].translations
    )
      return true;
    else return false;
  };

  const filterResults = (words) => {
    words = words.results;
    words = words.filter((word) => isValidEntry(word));
    return words;
  };

  const getDictionary = async () => {
    const response = await fetch(
      `https://lexicala1.p.rapidapi.com/search-entries?source=global&language=${currentLanguage}&page=${pageCount}&page-length=30&sample=30&text=`,
      options
    );
    let wordsData = await response.json();
    wordsData = filterResults(wordsData);
    wordsData = shuffleResults(wordsData);
    setCurrentPage(wordsData);
    return wordsData;
  };

  const toggleDisabled = (element) => {
    element.toggleAttribute("disabled");
    element.classList.toggle("disabled");
  };

  useEffect(() => {
    async function fetchData() {
      const vocabulate = document.querySelector("button");
      const select = document.querySelector("select");
      toggleDisabled(vocabulate);
      toggleDisabled(select);
      setCurrentWord("");
      await getDictionary();
      setPageCount(1);
      setEntryCount(0);
      toggleDisabled(vocabulate);
      toggleDisabled(select);
      vocabulate.removeAttribute("hidden");
      select.removeAttribute("hidden");
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  let page = "";

  const generateWord = async () => {
    if (!currentPage) {
      page = await getDictionary();
      setCurrentWord(page[entryCount]);
    } else setCurrentWord(currentPage[entryCount]);
    if (entryCount === currentPage.length - 1) {
      setPageCount(pageCount + 1);
      setEntryCount(0);
      setCurrentPage("");
    } else setEntryCount(entryCount + 1);
  };

  let word = "";
  if (currentWord) word = <Word entry={currentWord} color={currentColor} />;
  else word = null;

  return (
    <div className="App-container">
      <div className="controls">
        <button hidden onClick={generateWord}>
          Vocabulate!
        </button>
        <>
          <Selector
            setLanguage={setCurrentLanguage}
            setColor={setCurrentColor}
          />
        </>
      </div>
      <div className="App">
        <>{word}</>
      </div>
    </div>
  );
};

export default App;
