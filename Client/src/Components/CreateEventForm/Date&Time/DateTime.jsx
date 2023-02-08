import React, { useState } from "react";
import style from "./DateTime.module.css";

function DateTime({ input, setInput, errors, setShowMsg, showMsg }) {
  const handleChanges = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={style.info}>
      <h2 className={style.title}>Date and Time</h2>
      <p className={style.text}>
        Please choose the date and time that your event will take place. It's
        important to select the correct hour to ensure that your guests arrive
        on time.
      </p>
      <h4 className={style.title}>Start</h4>
      <input
        name="start_date"
        type="date"
        className={style.inputs}
        format="aaaa-mm-dd"
        onChange={handleChanges}
        value={input.start_date}
      />
      <input
        name="start_time"
        type="time"
        className={style.inputs}
        onChange={handleChanges}
        value={input.start_time}
      />
      <h4 className={style.title}>End</h4>
      <input
        name="end_date"
        type="date"
        className={style.inputs}
        format="aaaa-mm-dd"
        onChange={handleChanges}
        value={input.end_date}
      />
      <input
        name="end_time"
        type="time"
        className={style.inputs}
        onChange={handleChanges}
        value={input.end_time}
      />
    </div>
  );
}

export default DateTime;
