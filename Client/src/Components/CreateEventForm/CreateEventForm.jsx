import style from './CreateEventForm.module.css'
import Lateral from './Lateral/Lateral';
import Image from './UploadImage/UploadImage';
import BasicInfo from './Basic Information/BasicInfo'
import MoreInfo from './MoreInfo/MoreInfo';
import Category from './Category/Category';
import DateTime from './Date&Time/DateTime';
import Tickets from './Tickets/Tickets';
import { createEvent, selectEventForm } from '../../Slice/CreateEvent/CreateEvent'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

function Form(){
  const dispatch = useDispatch();
  const event = useSelector(state => state.event);
  const [errors, setErrors] = useState({});
  const [showMsg, setShowMsg] = useState ({});

  const [input, setInput] = useState({
    name:'',
    description:'',
    address_line:'',
    city:'',
    state:'',
    country:'',
    start_date:'',
    end_date:'',
    category:'',
    start_time:'',
    end_time:'',
    isPublic:null,
    isPaid:null,
    virtualURL:'',
    guests_capacity:'',
  })

  function validate(input) {
    let errors={}
    if(!input.description) {errors.description = 'Description es required'};
    if (input.name.length === 0) {
      errors.name = "Title is required";
    } else if (input.name.length < 4) {
      errors.name = "Title must have at least 4 characters";
    } else if (input.name.length > 30) {
      errors.name = "Title must have a maximum of 40 characters";
    }
    if(!input.category) {errors.category = 'You must select a category'};
    
    // if (input.virtualURL.length === 0) {errors.virtualURL = "URL is required";
      
    // } else if (input.virtualURL.length < 10) {
    //   errors.virtualURL = "URL must have at least 10 characters";
    // }
    // if(event.errorMsg===false) {errors.address_line = 'Enter an address'};
    // if(!input.address_line) {errors.address_line = 'Address is required'};
    const now = new Date();
    const startDate = new Date(input.start_date);
    if(!input.start_date){errors.start_date = 'Start date is required'}
    if (startDate <= now - 1){errors.start_date = 'Start date cannot be in the past'}
    if(!input.end_date){errors.end_date = 'End date is required'
    } else if (input.end_date < input.start_date) {errors.end_date = 'End date can not be before the start date'}
    if(!input.start_time){errors.start_time = 'Start time is required'}
    if(!input.end_time){errors.end_time = 'End date is required'}
    if (input.start_date === input.end_date) {
      const start = new Date(`${input.start_date} ${input.start_time}`);
      const end = new Date(`${input.end_date} ${input.end_time}`);
      if (start >= end) {
        errors.end_time = 'End time can not be before the start time';
      }
    }
    return errors;
  }
  const now = new Date();
console.log(now)
  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createEvent(input))
    alert("Event created!")
    console.log('el evento', event)
  };

  return(
    <div className={style.container}>
        {/* <Lateral/> */}
        <form className={style.form} onSubmit={e=>handleSubmit(e)}>
          <h1 className={style.title}>EVENT INFORMATION</h1>
          <Image/>
          <div className={style.split}></div>
          <BasicInfo input = {input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          {/* <div className={style.split}></div>
          <MoreInfo/> */}
          <div className={style.split}></div>
          <h1 className={style.title}>LOCATION AND DATE</h1>
          <Category input = {input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          <div className={style.split}></div>
          <DateTime input = {input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          <div className={style.split}></div>
          <Tickets input = {input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          {event.error ? <p className={style.errorMessage}>Can't create event</p> :
            event.create ? <p className={style.sendMessage}>Event created successfully</p>: undefined}
          <div className={style.footerForm}>
            {/* <button className={style.btnprimario}>Cancel</button> */}
            <button type='submit' className={style.btnprimario} disabled={Object.keys(errors).length !== 0} >Create</button>
          </div>
        </form>
    </div>
  )
};

export default Form;