/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Word from "./components/Word";
import Selector from "./components/Selector";
import "./style.css";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
    "X-RapidAPI-Host": "lexicala1.p.rapidapi.com",
  },
};

const App = () => {
  const [entryCount, setEntryCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  // default language Swedish
  const [currentLanguage, setCurrentLanguage] = useState("sv");
  const [currentColor, setCurrentColor] = useState("#d9b929");

  const shuffleResults = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
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
    const wordsResults = words.results;
    const filteredWords = wordsResults.filter((word) => isValidEntry(word));
    return filteredWords;
  };

  const getDictionary = async () => {
    // get entries based on current language and page count
    const response = await fetch(
      `https://lexicala1.p.rapidapi.com/search-entries?source=global&language=${currentLanguage}&page=${pageCount}&page-length=30&sample=30&text=`,
      options
    );
    if (!response.ok) {
      const app = document.querySelector(".App");
      app.textContent =
        "An error occurred. Please refresh the page or try again later.";
      return null;
    }
    const wordsData = await response.json();
    // modify results and assign to currentPage
    const filteredWords = filterResults(wordsData);
    const shuffledWords = shuffleResults(filteredWords);
    setCurrentPage(shuffledWords);
    return shuffledWords;
  };

  const toggleDisabled = (element) => {
    element.toggleAttribute("disabled");
    element.classList.toggle("disabled");
  };

  useEffect(() => {
    async function handleLanguageChange() {
      // disable buttons while new page of results is loading
      const vocabulate = document.querySelector("button");
      const select = document.querySelector("select");
      toggleDisabled(vocabulate);
      toggleDisabled(select);

      // load new page
      setCurrentWord("");
      await getDictionary();
      setPageCount(1);
      setEntryCount(0);

      // reactivate buttons (and unhide on first render)
      toggleDisabled(vocabulate);
      toggleDisabled(select);
      vocabulate.classList.remove("hidden");
      select.classList.remove("hidden");
    }
    handleLanguageChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  let page = "";

  const generateWord = async () => {
    if (!currentPage) {
      page = await getDictionary();
      setCurrentWord(page[entryCount]);
    } else setCurrentWord(currentPage[entryCount]);
    // once on last page of results, increment page count, reset entryCount and currentPage so that new data is fetched
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
        <button className="hidden" onClick={generateWord}>
          Vocabulate!
        </button>
        <>
          <Selector
            setLanguage={setCurrentLanguage}
            setColor={setCurrentColor}
          />
        </>
      </div>
      <div className="App" aria-label="App">
        <>{word}</>
      </div>
    </div>
  );
};

export default App;
