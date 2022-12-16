import React from "react";
import "../style.css";

const Selector = ({ setLanguage, setColor }) => {
  const handleChange = () => {
    const language = document.querySelector("select");
    setLanguage(language.selectedOptions[0].id);
    setColor(language.selectedOptions[0].dataset.color);
  };

  return (
    <select
      name="languages"
      className="hidden"
      onChange={handleChange}
    >
      <option value="Swedish" id="sv" data-color="#d9b929">
        Swedish
      </option>
      <option value="Norwegian" id="no" data-color="#d5b0b5">
        Norwegian
      </option>
      <option value="Dutch" id="nl" data-color="#c3c7d2">
        Dutch
      </option>
      <option value="Danish" id="dk" data-color="#e1f6fd"> 
        Danish
      </option>
      <option value="German" id="de" data-color="#F7D08A">
        German
      </option>
      <option value="Polish" id="pl" data-color="#4d5470"> 
        Polish
      </option>
      <option value="French" id="fr" data-color="#daced1">
        French
      </option>
      <option value="Italian" id="it" data-color="#000000">
        Italian
      </option>
      <option value="Spanish" id="es" data-color="#fbfbe1">
        Spanish
      </option>
      <option value="Brazilian Portuguese" id="br" data-color="#425f7c">
        Brazilian Portuguese
      </option>
      <option value="Simplified Chinese" id="zh" data-color="#76e7cd">
        Simplified Chinese
      </option>
      <option value="Japanese" id="ja" data-color="#80475E">
        Japanese
      </option>
    </select>
  );
};

export default Selector;
