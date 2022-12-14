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
      <option value="Spanish" id="es" data-color="#DDA448">
        Spanish
      </option>
      <option value="Simplified Chinese" id="zh" data-color="#BCD2EE">
        Simplified Chinese
      </option>
      <option value="German" id="de" data-color="#CC5A71">
        German
      </option>
      <option value="Japanese" id="ja" data-color="#80475E">
        Japanese
      </option>
      <option value="Polish" id="pl" data-color="#C89B7B">
        Polish
      </option>
    </select>
  );
};

export default Selector;
