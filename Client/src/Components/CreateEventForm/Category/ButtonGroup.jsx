import React, { useState } from "react";
import style from "./ButtonGroup.module.css";

const ButtonGroup = ({ buttons, handleGroup }) => {
  const [clickedId, setClickedId] = useState(0);

  const handleClick = (e, id) => {
    setClickedId(id);
    handleGroup(e);
  };

  return (
    <div className={style.groupcont}>
      {buttons.map((buttonLabel, i) => (
        <button
            type="button"
          key={i}
          name={buttonLabel}
          onClick={(e) => handleClick(e, i)}
          className={i === clickedId ? style.active : style.customButton}
        >
          {buttonLabel}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;