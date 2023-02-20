import React, { useEffect, useState } from "react";
import { useParams, useSearchParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosModeEventDetail, axiosModeEditEventDetail } from "../../Slice/EventDetail/EventDetailSlice";
import { axiosModeEventsBuys } from "../../Slice/EventsBuysForUser/BuysSlice";
import EventInformation from "./EventInformation/EventInformation";
import EventLocation from "./EventLocation/EventLocation";
import BuyButton from "./BuyButton/BuyButton";
import covers from "../../imgs/covers";
import { AiTwotoneCalendar, AiFillEdit } from "react-icons/ai";
import { RiTicket2Fill } from "react-icons/ri";
import style from './CardDetail.module.css';


const CardDetail = () => {

   
  const { eventDetail, loading, error } = useSelector(state => state.eventDetail);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [query] = useSearchParams()

  useEffect(() => {
    dispatch(axiosModeEventDetail(id));
    dispatch(axiosModeEventsBuys());
    if(query.get('checkout')) {
      localStorage.removeItem("formEvent");
      localStorage.removeItem("lastTime");
    }
  }, []);

  // estados para usuario organizador
  const user = useSelector(state => state.user);
  const [organizer, setOrganizer] = useState(false);
  const [edit, setEdit] = useState({
    name: false,
    description: false
  });
  const [editedEvent, setEditedEvent] = useState({
    name: '',
    description: '',
    edited: false
  });
  const [errors, setErrors] = useState({});
  
  //funciones de usuario organizador
  function validate(input){
    let errors={};
    if(!input.description.length) {errors.description = 'Description is required'};
    if (input.name.length === 0) {
      errors.name = "Title is required";
    } else if (input.name.length < 4) {
      errors.name = "Title must have at least 4 characters";
    } else if (input.name.length > 40) {
      errors.name = "Title must have a maximum of 40 characters";
    }
    return errors;
  }

  function handleOnChange(event){
    const object = {
        ...editedEvent,
        [event.target.name]: event.target.value,
        edited: true
    }
    setEditedEvent(object);
    setErrors(validate(object));
  }

  async function handleOnClick(event) {
        event.preventDefault();
        if(editedEvent.edited === true){
            await dispatch(axiosModeEditEventDetail({id, body:{...editedEvent}}));
            setEditedEvent({...editedEvent, edited: false});
            setEdit({name: false, description: false});
            await dispatch(axiosModeEventDetail(id));
  }
        
  function editButton(event) {
    event.preventDefault();
    setEdit({
        ...edit,
        [event.currentTarget.id]: true
    });
  }

  useEffect(() => {
    if(eventDetail.organizer){
      if(user.id === eventDetail.organizer.id){
        setOrganizer(true);
        setEditedEvent({
          ...editedEvent,
          name: eventDetail.name,
          description: eventDetail.description
        });
      }
    }
  }, [eventDetail, user]);
  
  if(loading) return <div className={style.spinner}><div></div><div></div><div></div><div></div></div>;
  if(error || Object.keys(eventDetail).length === 0) return <div className={style.error}>Something was wrong..</div>

  return(
    <>
    {eventDetail && Object.keys(eventDetail).length > 0 && 
    <>
      <div className={style.containertop}>
        <div className={style.container_img_and_h1}>
          <div className={style.containerimg}>
            <img src={eventDetail.cover_pic ? eventDetail.cover_pic : covers[eventDetail.category.name]} alt='cover_pic'/>
          </div>
          {edit.name === false 
            ? <h1>{eventDetail.name?.toUpperCase()} {organizer === true && <a id="name" onClick={editButton}><AiFillEdit size={35}/></a>}</h1> 
            : <div className={style.organizerdiv}>
                <input className={errors.name ? style.organizerinput_error : style.organizerinput} type="text" name="name" value={editedEvent.name} onChange={handleOnChange}/>
                {organizer === true && <a className={style.organizericon} onClick={editButton}><AiFillEdit size={35}/></a>}
                {organizer === true && errors.name && <p>{errors.name}</p>}
              </div>
          }
        </div> 
        <div className={style.containerdescription}> 
          {edit.description === false 
            ? <p>{eventDetail.description}</p> 
            : <textarea className={errors.description ? style.textarea_error : style.textarea_border} name="description" value={editedEvent.description} onChange={handleOnChange}/>}
          {organizer === true && <a id="description" className={style.organizericon} onClick={editButton}><AiFillEdit size={35}/></a>}
        </div>
        {organizer === true && errors.description && <p className={style.textdescription_error}>{errors.description}</p>}
      </div>

      <EventInformation/>

      <div className={style.containerbottom}>
        <div className={style.containerdate}>
          <div className={style.containericon}>
              <span className={style.iconspan}> <AiTwotoneCalendar size={35}/> </span> 
              <span className={style.iconspantext}>Date and Time</span> 
          </div>
          <h3>{eventDetail.start_date && `${eventDetail.start_date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1')}, ${eventDetail.start_time}hs`}</h3>
        </div>

        {eventDetail.category?.modality === 'Presential' && <EventLocation/>}

        <div className={style.containerdate}>
          <div className={style.containericon}>
            <span className={style.iconspan}> <RiTicket2Fill size={35}/> </span> 
            <span className={style.iconspantext}>About the event</span>
          </div>
          <div className={style.aboutevent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <img src="https://us.cdn.eltribuno.com/042016/1487154515198.jpeg" alt="party"/>
          </div>
        </div> 

        {organizer === false && <BuyButton organizer={organizer} edited={editedEvent.edited}/>}
        
        {organizer === true &&
          <div className={style.container_organizerbutton}>
            <div className={style.organizerbutton_div}>
              <div className={style.organizerbutton}>
                <a className={`btnprimario ${editedEvent.edited === false || Object.keys(errors).length > 0 ? style.organizerbutton_disabled : null}`} href="" onClick={handleOnClick}>
                  <span>Save Changes</span>
                </a>
              </div>
            </div>
          </div> 
        }
      </div>
    </>
      }
      </>
  )
}

export default CardDetail;