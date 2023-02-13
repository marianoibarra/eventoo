import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosModeEventDetail, axiosModeEditEventDetail } from "../../Slice/EventDetail/EventDetailSlice";
import EventInformation from "./EventInformation/EventInformation";
import EventLocation from "./EventLocation/EventLocation";
import BuyButton from "./BuyButton/BuyButton";
import covers from "../../imgs/covers";
import { AiTwotoneCalendar, AiFillEdit } from "react-icons/ai";
import { RiTicket2Fill } from "react-icons/ri";
import style from './CardDetail.module.css';


const CardDetail = () => {

    // const [assistant, setAssistant] = useState(false);
    const userId = useSelector(state => state.user.id);
    const { eventDetail } = useSelector(state => state.eventDetail);
    const [organizer, setOrganizer] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editedEvent, setEditedEvent] = useState({
        name: '',
        description: '',
        edited: false
    });
    const dispatch = useDispatch();
    const { id } = useParams(); 
 
    function handleOnChange(event){
        const object = {
            ...editedEvent,
            [event.target.name]: event.target.value,
            edited: true
        }
        setEditedEvent(object);
    }

    async function handleOnClick(event) {
        event.preventDefault();
        if(editedEvent.edited === true){
            await dispatch(axiosModeEditEventDetail({id, body:{...editedEvent}}));
            window.location.reload()
        }
    }

    function editButton(event) {
        event.preventDefault();
        console.log(event.target.id);
        setEdit(true);
    }

    useEffect(() => {
        dispatch(axiosModeEventDetail(id));
        return () => dispatch(axiosModeEventDetail());
    }, [dispatch]);

    useEffect(() => {
        if(eventDetail.organizer){
            if(userId === eventDetail.organizer.id){
                setOrganizer(true);
                setEditedEvent({
                    ...editedEvent,
                    name: eventDetail.name,
                    description: eventDetail.description
                });
            }
        }
    }, [eventDetail]);

    return(
        <>
            {Object.keys(eventDetail).length > 0 && 
                <div className={style.containertop}>
                    <div className={style.container_img_and_h1}>
                        <div className={style.containerimg}>
                            <img src={eventDetail.cover_pic ? eventDetail.cover_pic : covers[eventDetail.category.name]} alt='cover_pic'/>
                        </div>
                        {edit === false ? 
                            <h1>{eventDetail.name.toUpperCase()} {organizer === true && <a onClick={editButton}><AiFillEdit size={35}/></a>}</h1> :
                            <div className={style.organizerdiv}>
                                <input className={style.organizerinput} type="text" name="name" value={editedEvent.name} onChange={handleOnChange}/>
                                {organizer === true && <a className={style.organizericon} onClick={editButton}><AiFillEdit size={35}/></a>}
                            </div>
                        }
                    </div> 
                    <div className={style.containerdescription}> 
                        {edit === false ? <p>{eventDetail.description}</p> : <textarea name="description" value={editedEvent.description} onChange={handleOnChange}/>}
                        {organizer === true && <a className={style.organizericon} onClick={editButton}><AiFillEdit size={35}/></a>}
                    </div>
                </div>
            }

            <EventInformation/>

            {Object.keys(eventDetail).length > 0 && 
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

                    {organizer === false && <BuyButton/>}

                    {organizer === true && 
                        <div className={style.organizerbutton}>
                            <a className={`btnprimario ${editedEvent.edited === false && style.organizerbutton_disabled}`} href="" onClick={handleOnClick}>
                                <span>Save Changes</span>
                            </a>
                        </div>
                    }

                </div>
            }
        </>
    )
}

export default CardDetail;