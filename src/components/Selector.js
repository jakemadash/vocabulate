import React from "react";
import "../style.css";

const Selector = ({ setLanguage }) => {
  const handleChange = () => {
    const language = document.querySelector(".language");
    setLanguage(language.selectedOptions[0].id);

    // const word = document.querySelector('.word');
    // word.textContent = ''

  };

  return (
    <select name="languages" className="language" onChange={handleChange}>
      <option value="Swedish" id="sv">
        Swedish
      </option>
      <option value="Spanish" id="es">
        Spanish
      </option>
      <option value="Simplified Chinese" id="zh">
        Simplified Chinese
      </option>
      <option value="German" id="de">
        German
      </option>
      <option value="Japanese" id="ja">
        Japanese
      </option>
      <option value="Polish" id="pl">
        Polish
      </option>
    </select>
  );
};

export default Selector;
