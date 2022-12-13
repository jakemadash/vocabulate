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
    console.log(word.senses)
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
    console.log(wordsData);
    return wordsData;
  };

  useEffect(() => {
    async function fetchData() {
      await getDictionary();
      setPageCount(1)
      setEntryCount(0)
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
    console.log(currentPage)
    console.log(currentWord);
    console.log(page);
    if (entryCount === currentPage.length - 1) {
      setPageCount(pageCount + 1);
      setEntryCount(0);
      setCurrentPage("");
    } else setEntryCount(entryCount + 1);
  };

  let word = "";
  if (currentWord) word = <Word entry={currentWord} />;
  else word = null;

  let language = "";
  if (currentLanguage) language = <Selector setLanguage={setCurrentLanguage} />;
  else language = null;

  console.log(currentLanguage);

  return (
    <div className="App-container">
      <div className="App">
        <button onClick={generateWord}>Vocabulate!</button>
        <>{language}</>
        <>{word}</>
      </div>
    </div>
  );
};

export default App;
