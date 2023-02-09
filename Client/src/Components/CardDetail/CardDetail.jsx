import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosModeEventDetail } from "../../Slice/EventDetail/EventDetailSlice";
import EventInformation from "./EventInformation/EventInformation";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiTicket2Fill } from "react-icons/ri";
import style from './CardDetail.module.css';

const CardDetail = () => {

    const { eventDetail } = useSelector(state => state.eventDetail);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(axiosModeEventDetail(id));
    }, [dispatch]);

    const initial_cover_pic = 'https://dummyimage.com/1200/005D5E/ffffff.png&text=Eventoo';

    return(
        <>
            {Object.keys(eventDetail).length > 0 && <div className={style.containertop}>
                <div className={style.containerimage}>
                    <img className={style.image} src={eventDetail.cover_pic ? eventDetail.cover_pic.replace('x.png', '1200')+'.png&text=cover_pic' : initial_cover_pic} alt='cover_pic'/>
                    <h1>{eventDetail.name.toUpperCase()}</h1>
                </div>
                <div className={style.containerdescription}>
                    <p>{eventDetail.description}</p>
                </div>
            </div>}

            <EventInformation/>

            {Object.keys(eventDetail).length > 0 && <div className={style.containerbottom}>
                <div className={style.divcompra}>
                    <div className={style.containerdate}>
                        <div className={style.containericon}>
                            <span className={style.iconspan}> <AiTwotoneCalendar size={35}/> </span> 
                            <span className={style.iconspantext}>Date and Time</span> 
                        </div>
                        <h3>{eventDetail.start_date && `${eventDetail.start_date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1')}, ${eventDetail.start_time}hs`}</h3>
                        </div>
                    <div className={style.botondecompra}>Buy button</div>
                </div>

                <div className={style.containerdate}>
                    <div className={style.containericon}>
                        <span className={style.iconspan}> <FaMapMarkedAlt size={35}/> </span> 
                        <span className={style.iconspantext}>Location</span> 
                    </div>
                    <span className={style.ubicationtext}>{eventDetail.address.address_line}</span>
                    <span className={style.ubicationtext}><b>{eventDetail.address.city}</b>{`, ${eventDetail.address.state} | ${eventDetail.address.country}`}</span>
                    <img src="https://motor.elpais.com/wp-content/uploads/2022/01/google-maps-22.jpg" alt="map" />
                </div>

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
            </div>}
        </>
    )
}

export default CardDetail;