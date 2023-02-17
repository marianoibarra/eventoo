import React, { useState } from "react";
import style from "./BankAccountCards.module.css";

const BankAccountCards = ({ buttons, setInput, input }) => {
  
  const [clickedId, setClickedId] = useState(null);

  const handleClick = (e, id) => {
    setClickedId(id);
    setInput({
      ...input,
      bankAccount: buttons[id].id
    });
  };

  return (
    <div className={style.groupcont}>
      {buttons && Array.isArray(buttons) && buttons.length > 0 && buttons.map((buttonLabel, i) => (
        <div
            type="button"
          key={i}
          name={buttonLabel}
          onClick={(e) => handleClick(e, i)}
          className={i === clickedId ? style.active : style.customButton}
        >
          <h5>{buttonLabel.name}</h5>
          <p>{buttonLabel.CBU}</p>
        </div>
      ))}
    </div>
  );
};

export default BankAccountCards;