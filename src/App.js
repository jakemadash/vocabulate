import React, { useState, useEffect } from "react";

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

  const getDictionary = async () => {
    const response = await fetch(
      `https://lexicala1.p.rapidapi.com/search-entries?source=global&language=sv&page=${pageCount}&page-length=30&sample=30&text=`,
      options
    );
    const wordsData = await response.json();
    return wordsData;
  };

  const generateWord = async () => {
    const dictionary = await getDictionary();
    console.log(dictionary)
  };

  generateWord();
  return <div className="App"></div>;
};

export default App;
