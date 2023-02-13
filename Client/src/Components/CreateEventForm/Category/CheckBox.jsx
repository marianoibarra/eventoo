import React, { useState } from 'react';
import style from './CheckBox.module.css';

const Checkbox = ({input, setInput}) => {

  const handleChange = (e) => {
    //e.preventDefault();
    setInput({
        ...input,
        [e.target.name]: e.target.checked
    })
    console.log(input)
};

  return (
    <div className={style.container}>
      <label className={style.checkbox}>
        <input
          type="checkbox"
          name="disability_access"
          checked={input.disability_access}
          onChange={handleChange}
        />
        Disability Access
      </label>
      <br />
      <label className={style.checkbox}>
        <input
          type="checkbox"
          name="pet_friendly"
          checked={input.pet_friendly}
          onChange={handleChange}
        />
        Pet Friendly
      </label>
      <br />
      <label className={style.checkbox}>
        <input
          type="checkbox"
          name="parking"
          checked={input.parking}
          onChange={handleChange}
        />
        Parking
      </label>
      <br />
      <label className={style.checkbox}>
        <input
          type="checkbox"
          name="smoking_zone"
          checked={input.smoking_zone}
          onChange={handleChange}
        />
        Smoking Zone
      </label>
    </div>
  );
};

export default Checkbox;
