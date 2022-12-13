import React from "react";
import "../style.css";

const Word = (props) => {
  const senses = props.entry.senses;

  const correctText = (translation) => {
    console.log(translation)
    let text = translation.text
    const sth = /sth/gi;
    const sb = /sb/gi;
    text = text.replace(sth, 'something')
    text = text.replace(sb, 'somebody')
    return text;
  }

  const printTranslations = (translation, index) => {
    const text = correctText(translation)
    return (
      <div key={index}>
        {index + 1}. {text}
      </div>
    );
  };

  const checkTranslationCount = (sense) => {
    let translation = ''
    if ('text' in sense.translations.en) {
      translation = `1. ${correctText(sense.translations.en)}`
    }
    else translation = sense.translations.en.map(printTranslations)
    return translation;
  }

  const printSenses = (sense, index) => {
    console.log(sense.translations.en);
    return (
      <div key={index} className="sense">
        <div className="translation">
          {checkTranslationCount(sense)}
        </div>
        <div className="example">{sense.examples[0].text}</div>
        <div className="example-translation">
          {sense.examples[0].translations.en.text}
        </div>
      </div>
    );
  };

  console.log(senses);

  return (
    <div>
      <div className="word-header">
        <div className="word">{props.entry.headword.text}</div>
        <div>({props.entry.headword.pronunciation.value})</div>
      </div>
      <div className="part-of-speech">{props.entry.headword.pos}</div>
      <div className="sense">{senses.map(printSenses)}</div>
    </div>
  );
};

export default Word;
