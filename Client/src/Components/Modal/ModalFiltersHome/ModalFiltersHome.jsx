import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilter } from '../../../Slice/newFilter/newFilterSlice';
import {TbDisabled, TbParking} from 'react-icons/tb'
import {MdPets, MdSmokingRooms} from 'react-icons/md'
import style from './ModalFiltersHome.module.css'
import { FaLessThanEqual } from 'react-icons/fa';
      

const ModalFiltersHome = ({setShowModal}) => {

  const dispatch = useDispatch()
  const filter = useSelector(state => state.newFilter)

  const {age_range = null, disability_access = null, parking = null, smoking_zone = null, pet_friendly = null} = filter

  const [moreFilters, setMoreFilters] = useState({
    age_range,
    disability_access,
    parking,
    smoking_zone,
    pet_friendly,
  })

  const handleClear = () => {
    let clear = {
      age_range: null,
      disability_access: null,
      parking: null,
      smoking_zone: null,
      pet_friendly: null,
    }
    setMoreFilters(clear)
  }

  const handleSuccess = () => {
    console.log(moreFilters,'evento')
    dispatch(setFilter(moreFilters))
    setShowModal(false)
  }

  const handleClick = (e) => {
    if(e.target.name === 'age_range') {
      setMoreFilters({
        ...moreFilters,
        age_range: e.target.value
      })
    } else {
      setMoreFilters({
        ...moreFilters,
        [e.target.name]: e.target.checked ? true : null
      })
    }
  }

  return (
    <Modal width={'600px'} height={'400px'} setShowModal={setShowModal}>
      <div className={style.modalWrapper}>

        <div onClick={() => setShowModal(false)} className={style.close}>
          X
        </div>
        <h3 className={style.title}>More filters</h3>
        <div className={style.ageranges}>
          Facilities
          <FormGroup className={style.checkboxes}>
            <FormControlLabel onChange={handleClick} checked={moreFilters.disability_access} name='disability_access' className={style.checkbox} control={<Checkbox  sx={{'&.Mui-checked': {color: '#007F80'}}}/>} label={<span className={style.label}><TbDisabled size={26}/>Disability Access</span>} />
            <FormControlLabel onChange={handleClick} checked={moreFilters.parking} name='parking' className={style.checkbox} control={<Checkbox  sx={{'&.Mui-checked': {color: '#007F80'}}}/>}label={<span className={style.label}><TbParking size={26}/>Parking</span>} />
            <FormControlLabel onChange={handleClick} checked={moreFilters.smoking_zone} name='smoking_zone' className={style.checkbox} control={<Checkbox  sx={{'&.Mui-checked': {color: '#007F80'}}}/>} label={<span className={style.label}><MdSmokingRooms size={26}/>Smoking Zone</span>}/>
            <FormControlLabel onChange={handleClick} checked={moreFilters.pet_friendly} name='pet_friendly' className={style.checkbox} control={<Checkbox  sx={{'&.Mui-checked': {color: '#007F80'}}}/>}  label={<span className={style.label}><MdPets size={26}/>Pet Friendly</span>} />
          </FormGroup>
        </div>
        <div className={style.ageranges}>
          Age ranges
          <RadioGroup value={moreFilters.age_range} className={style.radios} row onChange={handleClick} >
            <FormControlLabel name='age_range' className={style.radio} control={<Radio sx={{'&.Mui-checked': {color: '#007F80'}}} />} value="All public" label="All public" />
            <FormControlLabel name='age_range' className={style.radio} control={<Radio sx={{'&.Mui-checked': {color: '#007F80'}}} />} value="+13" label="+13" />
            <FormControlLabel name='age_range' className={style.radio} control={<Radio sx={{'&.Mui-checked': {color: '#007F80'}}} />} value="+16" label="+16" />
            <FormControlLabel name='age_range' className={style.radio} control={<Radio sx={{'&.Mui-checked': {color: '#007F80'}}} />} value="+18" label="+18" />
          </RadioGroup>
        </div>
      
      <div className={style.buttons}>
        <div disabled={Object.values(moreFilters).every(o => o === null)} onClick={handleClear} className={style.clear}>
          Clear filters
        </div>
        <div onClick={handleSuccess} className={style.success}>
          Accept
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalFiltersHome

/*
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

*/