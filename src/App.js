import React, { useState, useEffect } from "react";
import Word from "./components/Word";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "fd76888365mshc55b027be74dc4dp1d4f7ejsn88ecdcc39f3f",
    "X-RapidAPI-Host": "lexicala1.p.rapidapi.com",
  },
};

const App = () => {
  const [entryCount, setEntryCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState("");
  const [currentWord, setCurrentWord] = useState("");

  // useEffect(() => {
  //   const word = document.querySelector('.word')
  //   word.textContent = currentWord;
  // });

  const shuffleResults = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const filterResults = (words) => {
    words = words.results;
    const validPOS = ["noun", "verb", "adjective", "adverb"];
    words = words.filter((word) => validPOS.includes(word.headword.pos));
    return words;
  };

  const getDictionary = async () => {
    const response = await fetch(
      `https://lexicala1.p.rapidapi.com/search-entries?source=global&language=sv&page=${pageCount}&page-length=30&sample=30&text=`,
      options
    );
    let wordsData = await response.json();
    return new Promise((resolve) => {
      wordsData = filterResults(wordsData);
      wordsData = shuffleResults(wordsData);
      console.log(wordsData)
      setCurrentPage(wordsData)
      resolve(wordsData);
    });
  };

  let page = ''

  const generateWord = async () => {
    console.log(pageCount);
    console.log(entryCount);
    console.log(currentPage);
    if (!currentPage) {
      page = await getDictionary()
      setCurrentWord(page[entryCount].headword.text);
    }
    else setCurrentWord(currentPage[entryCount].headword.text);
      if (entryCount === currentPage.length - 1) {
        setPageCount(pageCount + 1);
        setEntryCount(0);
        setCurrentPage('');
      } else setEntryCount(entryCount + 1);
  };

  return (
    <div className="App">
      <button
        onClick={async () => {
          await generateWord();
        }}
      >
        hey
      </button>
      <Word word={currentWord} />
      <div className="word"></div>
    </div>
  );
};

export default App;
