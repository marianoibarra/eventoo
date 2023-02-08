import style from './CreateEventForm.module.css'
import Lateral from './Lateral/Lateral';
import BasicInfo from './Basic Information/BasicInfo'
import MoreInfo from './MoreInfo/MoreInfo';
import Category from './Category/Category';
import DateTime from './Date&Time/DateTime';
import Tickets from './Tickets/Tickets';
import { createEvent, selectEventForm } from '../../Slice/CreateEvent/CreateEvent'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import UploadImage from './UploadImage/UploadImage';

function Form(){

  const handleSubmit = e => {
    e.preventDefault();
    // dispatch(createEvent())
  };
  
  const initialState = {
    name: null,
    description: null,
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    isPublic: null,
    virtualURL: null,
    category: null,
    isPremium: null,
    isPaid: null,
    price: null,
    age_range: null,
    guests_capacity: null,
    placeName: null,
    advertisingTime_start: null,
    adversiting_end: null,
    cover_pic: null,
    address_line: null,
    city: null,
    state: null,
    country: null,
    zip_code: null,
    disability_access: null,
    parking: null,
    smoking_zone: null,
    pet_friendly: null,
    bankAccount: null,
  }
  
  const [input, setInput] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [showMsg, setShowMsg] = useState({})


  const validate = (input) => {
    let errors = {}

    return errors
  }

  useEffect(() => {
    setErrors(validate(input))
    console.log(input)
  }, [input])

  return(
    <div className={style.container}>
        <form className={style.form} onSubmit={e=>handleSubmit(e)}>
          <h1 className={style.title}>EVENT INFORMATION</h1>
          <UploadImage input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          <div className={style.split}></div>
          <BasicInfo input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          <div className={style.split}></div>
          <h1 className={style.title}>LOCATION AND CATEGORY</h1>
          <Category input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          <div className={style.split}></div>
          <DateTime input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          <div className={style.split}></div>
          <Tickets input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          {/* {event.error ? <p className={style.errorMessage}>Can't create event</p> :
            event.create ? <p className={style.sendMessage}>Event created successfully</p>: undefined} */}
          <div className={style.footerForm}>
            {/* <button className={style.btnprimario}>Cancel</button> */}
            <button type='submit' className={style.btnprimario} disabled={Object.keys(errors).length !== 0} >Create</button>
          </div>
        </form>
    </div>
  )
};

export default Form;