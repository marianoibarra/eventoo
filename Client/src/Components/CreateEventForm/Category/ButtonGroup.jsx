import React, { useState } from "react";
import "./button-group.css";

const ButtonGroup = ({ buttons, handleGroup }) => {
  const [clickedId, setClickedId] = useState(0);

  const handleClick = (event, id) => {
    setClickedId(id);
    handleGroup(event);
  };

  return (
    <div className="group-cont">
      {buttons.map((buttonLabel, i) => (
        <button
          key={i}
          name={buttonLabel}
          onClick={(event) => handleClick(event, i)}
          className={i === clickedId ? "customButton active" : "customButton"}
        >
          {buttonLabel}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;