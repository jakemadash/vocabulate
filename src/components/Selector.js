import React from "react";
import "../style.css";

const Selector = ({ setLanguage, setColor }) => {
  const handleChange = () => {
    const language = document.querySelector(".language");
    setLanguage(language.selectedOptions[0].id);
    setColor(language.selectedOptions[0].dataset.color);
  };

  return (
    <select name="languages" className="language" onChange={handleChange}>
      <option value="Swedish" id="sv" data-color="#5B85AA">
        Swedish
      </option>
      <option value="Norwegian" id="no" data-color="#90A9B7">
        Norwegian
      </option>
      <option value="Dutch" id="nl" data-color="#9DAD6F">
        Dutch
      </option>
      <option value="Danish" id="dk" data-color="#9B9987">
        Danish
      </option>
      <option value="German" id="de" data-color="#CC5A71">
        German
      </option>
      <option value="Polish" id="pl" data-color="#C89B7B">
        Polish
      </option>
      <option value="French" id="fr" data-color="#CC444B">
        French
      </option>
      <option value="Italian" id="it" data-color="#36827F">
        Italian
      </option>
      <option value="Spanish" id="es" data-color="#DDA448">
        Spanish
      </option>
      <option value="Brazilian Portuguese" id="br" data-color="#FF8A5B">
        Brazilian Portuguese
      </option>
      <option value="Simplified Chinese" id="zh" data-color="#3C787E">
        Simplified Chinese
      </option>
      <option value="Japanese" id="ja" data-color="#80475E">
        Japanese
      </option>
    </select>
  );
};

export default Selector;
