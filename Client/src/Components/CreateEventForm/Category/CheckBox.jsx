import React, { useState } from 'react';
import { MdPets, MdSmokingRooms } from 'react-icons/md';
import { TbDisabled, TbParking } from 'react-icons/tb';
import style from './CheckBox.module.css';
import Checkbox from '@mui/material/Checkbox';

const CheckboxFacilities = ({input, setInput}) => {

  const handleChange = (e) => {
    setInput({
        ...input,
        [e.target.name]: e.target.checked
    })
};

  return (
    <div className={style.container}>
      <label className={style.checkbox}>
        <Checkbox
        checked={input.disability_access}
        onChange={handleChange}
        name="disability_access" 
        sx={{
          color: '#007F80' ,
          '&.Mui-checked': {
            color: '#007F80',
          },WebkitTextFillColor: 'var(--dark-text)'
        }}/>
        <span className={style.iconspan}> <TbDisabled size={37}/> </span>
        Disability Access
      </label>
      <br />
      <label className={style.checkbox}>
      <Checkbox
        checked={input.pet_friendly}
        onChange={handleChange}
        name="pet_friendly"
        sx={{
          color: '#007F80' ,
          '&.Mui-checked': {
            color: '#007F80',
          },
        }}/>
        <span className={style.iconspan}> <MdPets size={37}/> </span> 
        Pet Friendly
      </label>
      <br />
      <label className={style.checkbox}>
        <Checkbox
        checked={input.parking}
        onChange={handleChange}
        name="parking"
        sx={{
          color: '#007F80' ,
          '&.Mui-checked': {
            color: '#007F80',
          },
        }}/>
        <span className={style.iconspan}> <TbParking size={37}/> </span>
        Parking
      </label>
      <br />
      <label className={style.checkbox}>
        <Checkbox
        checked={input.smoking_zone}
        onChange={handleChange}
        name="smoking_zone"
        sx={{
          color: '#007F80' ,
          '&.Mui-checked': {
            color: '#007F80',
          },
        }}/>
        <span className={style.iconspan}> <MdSmokingRooms size={37}/> </span> 
        Smoking Zone
      </label>
    </div>
  );
};

export default CheckboxFacilities;
