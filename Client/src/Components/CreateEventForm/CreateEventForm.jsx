import style from './CreateEventForm.module.css'
import Lateral from './Lateral/Lateral';
import BasicInfo from './Basic Information/BasicInfo'
import MoreInfo from './MoreInfo/MoreInfo';
import Category from './Category/Category';
import DateTime from './Date&Time/DateTime';
import Tickets from './Tickets/Tickets';
import { clearState, createEvent, selectEventForm } from '../../Slice/CreateEvent/CreateEvent'
import { useSelector, useDispatch } from 'react-redux';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import UploadImage from './UploadImage/UploadImage';
import ModalBank from '../Modal/ModalBank/ModalBank';
import { getBankAccounts } from '../../Slice/BankAcount/BankAcount';
import ModalFormEvent from '../Modal/ModalFormEvent/ModalFormEvent';
import { SessionContext } from '../..';
import {useNavigate} from 'react-router-dom'


function Form(){
  const dispatch = useDispatch();
  const event = useSelector(state => state.event);
  const {isLogged} = useSelector(state => state.user);
  const [selectedModality, setSelectedModality] = useState('Presential');
  const[showModal, setShowModal] = useState(false);
  const { setShowSessionModal } = useContext(SessionContext);

  const stgData = JSON.parse(localStorage.getItem("formEvent"))

  useEffect(() => {
    isLogged && dispatch(getBankAccounts());
  }, []);


  const initialState = {
    address_line:null,
    adversiting_end:null,
    advertisingTime_start:null,
    age_range:'ALL PUBLIC',
    bankAccount:'',
    category:null,
    city:null,
    country:null,
    cover_pic:null,
    description:null,
    disability_access:null,
    end_date:'',
    end_time:'',
    guests_capacity:"",
    modality: '',
    isPaid:true,
    isPremium:null,
    isPublic:true,
    name:'',
    parking:null,
    pet_friendly:null,
    placeName:null,
    price:null,
    smoking_zone:null,
    start_date:'',
    start_time:'',
    state:null,
    virtualURL:'',
    zip_code:null,
  }
  

  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showMsg, setShowMsg] = useState ({});

  const navigate = useNavigate()

  function validate(input) {
    let errors={}
    if(!input.description) {errors.description = 'Description es required'};
    if (input.name.length === 0) {
      errors.name = "Title is required";
    } else if (input.name.length < 4) {
      errors.name = "Title must have at least 4 characters";
    } else if (input.name.length > 40) {
      errors.name = "Title must have a maximum of 40 characters";
    }
    if(!input.category) {errors.category = 'You must select a category'}
    
    if (selectedModality === 'Virtual' && (input.virtualURL === null || input.virtualURL.length === 0)) {errors.virtualURL = "URL is required";
    } else if (selectedModality === 'Virtual' && input.virtualURL.length < 10) {
      errors.virtualURL = "URL must have at least 10 characters";
    }
    if(!input.address_line && selectedModality === 'Presential') {errors.address_line = 'Address is required'};

    const now = new Date();
    const startDate = new Date(input.start_date);

    if(!input.start_date){errors.start_date = 'Start date is required'}
    if (startDate < now ){errors.start_date = 'Start date cannot be in the past'}
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
    const num = parseInt(input.guests_capacity)
    if(!input.guests_capacity ){errors.guests_capacity = 'Capacity is required'
    }else if( isNaN(num) || num < 0) { errors.guests_capacity = 'Enter a valid number'};

    console.log(errors)
    return errors;
  }
  
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    setErrors(validate(input));
    if(confirm !== null) {
      localStorage.setItem("formEvent" , JSON.stringify(input));
      localStorage.setItem("lastTime" , new Date());
    }
  }, [input]);



  useEffect(() => {
    if(stgData && stgData.name !== null & stgData.name.length > 0) {
      setShowModal(true)
    } else {
      setConfirm(false)
    }
  }, [])


  useEffect(() => {
    if(confirm === true) {
      setInput(stgData)
    } else if(confirm === false) {
      localStorage.removeItem("formEvent");
      localStorage.removeItem("lastTime");
    }
  }, [confirm])


  const handleSubmit = e => {
    e.preventDefault();
    if(isLogged){
      dispatch(createEvent(input))
      alert("Event created!")
    } else {
      alert('Please Log in');
      setShowSessionModal('login');
    };
  };

  return(
    <div className={style.container}>
        { showModal &&  <ModalFormEvent stgData={stgData} setConfirm={setConfirm} setShowModal={setShowModal}/>}
        {/* <Lateral/> */}
        
        <form className={style.form} onSubmit={e=>handleSubmit(e)}>
          <h1 className={style.title}>EVENT INFORMATION</h1>
          <UploadImage input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          <div className={style.split}></div>
          <BasicInfo input = {input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          {/* <div className={style.split}></div>
          <MoreInfo/> */}
          <div className={style.split}></div>
          <h1 className={style.title}>LOCATION AND CATEGORY</h1>
          <Category input = {input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg} selectedModality={selectedModality} setSelectedModality={setSelectedModality} />
          <div className={style.split}></div>
          <DateTime input = {input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          <div className={style.split}></div>
          <Tickets input = {input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg}/>
          {event.error ? <p className={style.errorMessage}>Can't create event</p> :
            event.create ? <p className={style.sendMessage}>Event created successfully</p>: undefined}
          {/* <button type='button' className={style.btnprimario} onClick={() => setShowModal(!showModal)}>Bank Account</button> */}
          <div className={style.footerForm}>
            {/* <button type='button' >Save changes</button> */}
            <button type='submit' className={style.btnprimario} disabled={Object.keys(errors).length !== 0} >Create</button>
          </div>
        </form>
    </div>
  )
};

export default Form;