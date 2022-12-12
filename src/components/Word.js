import React from "react";

const Word = (props) => {
  const senses = props.entry.senses;

  const printTranslations = (translation, index) => {
    return <div key={index}>{translation.text}</div>;
  };

  const printSenses = (sense, index) => {
    console.log(sense.translations.en);
    return (
      <div key={index}>
        <div>{sense.translations.en.text || sense.translations.en.map(printTranslations)}</div>
        <div>{sense.examples[0].text}</div>
        <div>{sense.examples[0].translations.en.text}</div>
      </div>
    );
  };

  console.log(senses);

  return (
    <div>
      <div>
        {props.entry.headword.text}({props.entry.headword.pronunciation.value})
      </div>
      <div>{props.entry.headword.pos}</div>
      {senses.map(printSenses)}
    </div>
  );
};

export default Word;
