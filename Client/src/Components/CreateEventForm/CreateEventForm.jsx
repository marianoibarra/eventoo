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

function Form(){
  const dispatch = useDispatch();
  const event = useSelector(state => state.event);
  const description = useSelector(state => state.event.description);
  const category = useSelector(state => state.event.category)

  const handleSubmit = e => {
    e.preventDefault();
    if(!event.name||
      !event.description
      // ||
      // !event.cover_pic||
      // !event.address_line||
      // !event.city||
      // !event.state||
      // !event.country||
      // !event.start_date||
      // !event.end_date||
      // !event.start_time||
      // !event.end_time||
      // !event.isPublic||
      // !event.virtualURL||
      // !event.guests_capacity||
      // !event.category||
      // !event.isPaid||
      // !event.address
      ){
        event.error='There are missing fields to fullfilled';
        return
    }
    dispatch(createEvent(event))
    // alert("Event created!")
    console.log('el evento', event)
  };

    return(
    <div className={style.container}>
        {/* <Lateral/> */}
        <form className={style.form} onSubmit={e=>handleSubmit(e)}>
          <h1 className={style.title}>EVENT INFORMATION</h1>
          <Image/>
          <div className={style.split}></div>
          <BasicInfo/>
          {/* <div className={style.split}></div>
          <MoreInfo/> */}
          <div className={style.split}></div>
          <h1 className={style.title}>LOCATION AND DATE</h1>
          <Category/>
          <div className={style.split}></div>
          <DateTime/>
          <div className={style.split}></div>
          <Tickets/>
          {event.error ? <p className={style.errorMessage}>Can't create event</p> :
            event.create ? <p className={style.sendMessage}>Event created successfully</p>: undefined}
          <div className={style.footerForm}>
            {/* <button className={style.btnprimario}>Cancel</button> */}
            <button type='submit' className={style.btnprimario} >Create</button>
          </div>
        </form>
    </div>
  )
};

export default Form;