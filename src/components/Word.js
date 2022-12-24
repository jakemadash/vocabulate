import React from "react";
import "../style.css";

const Word = (props) => {
  const isValid = (sense) => {
    // ensure entry includes English translations and examples
    if (
      sense.translations &&
      "en" in sense.translations &&
      sense.examples &&
      sense.examples[0].translations &&
      "en" in sense.examples[0].translations
    )
      return true;
    else return false;
  };
  const senses = props.entry.senses.filter((sense) => isValid(sense));

  const correctText = (translation) => {
    // remove abbreviations for 'something' and 'somebody'
    let text = translation.text || translation[0].text;
    const sth = /sth/gi;
    const sb = /sb/gi;
    text = text.replace(sth, "something");
    text = text.replace(sb, "somebody");
    return text;
  };

  const printTranslations = (translation, index) => {
    const text = correctText(translation);
    return (
      <div key={index} aria-label={index + 1}>
        {index + 1}. {text}
      </div>
    );
  };

  const checkTranslationCount = (sense) => {
    let translation = "";
    if ("text" in sense.translations.en) {
      // only one translation, not an array
      translation = `1. ${correctText(sense.translations.en)}`;
    } else translation = sense.translations.en.map(printTranslations);
    return translation;
  };

  const printSenses = (sense, index) => {
    return (
      <div key={index} className="sense">
        <div className="translation" aria-label='translation'>{checkTranslationCount(sense)}</div>
        <div className="example" style={color} aria-label='example'>
          {sense.examples[0].text}
        </div>
        <div className="example-translation" aria-label='example-translation'>
          {correctText(sense.examples[0].translations.en)}
        </div>
      </div>
    );
  };

  const pronunciationExists = (word) => {
    if (word.pronunciation) return `(${word.pronunciation.value})`;
    // leave blank space if no pronunciation
    else return "";
  };

  const color = {
    color: `${props.color}`,
  };

  return (
    <div className="word">
      <div className="word-header transition">
        <div className="word-text" style={color} aria-label='word-text'>
          {props.entry.headword.text}
        </div>
        <div aria-label='pronunciation'>{pronunciationExists(props.entry.headword)}</div>
      </div>
      <div className="part-of-speech transition" aria-label='part-of-speech'>
        {props.entry.headword.pos}
      </div>
      <div className="sense transition">{senses.map(printSenses)}</div>
    </div>
  );
};

export default Word;
