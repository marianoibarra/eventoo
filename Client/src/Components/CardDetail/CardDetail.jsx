import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosModeEvent } from "../../Slice/Event/EventSlice";
import { fetchGetEvent } from "../../Slice/Event/EventSlice";
import EventInformation from "./EventInformation/EventInformation";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiTicket2Fill } from "react-icons/ri";
import style from './CardDetail.module.css';

const CardDetail = () => {

    const { event } = useSelector(state => state.event);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchGetEvent());
    // }, [dispatch]);

    useEffect(() => {
        dispatch(axiosModeEvent());
    }, [dispatch]);

    const initial_cover_pic = 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/tour960.png';

    return(
        <>
            {Object.keys(event).length && <div className={style.containertop}>
                <div className={style.containerimage}>
                    <img className={style.image} src={initial_cover_pic} alt='cover_pic'/>
                    <h1>{event[1].name.toUpperCase()}</h1>
                </div>
                <div className={style.containerdescription}>
                    <p>{event[1].description}</p>
                </div>
            </div>}

            <EventInformation/>

            {Object.keys(event).length && <div className={style.containerbottom}>
                <div className={style.divcompra}>
                    <div className={style.containerdate}>
                        <div className={style.containericon}>
                            <span className={style.iconspan}> <AiTwotoneCalendar size={35}/> </span> 
                            <span className={style.iconspantext}>Fecha y Horario</span> 
                        </div>
                        <h3>{`${event[1].start_date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1')}, ${event[1].start_time}hs`}</h3>
                        </div>
                    <div className={style.botondecompra}>Boton de compra</div>
                </div>

                <div className={style.containerdate}>
                    <div className={style.containericon}>
                        <span className={style.iconspan}> <FaMapMarkedAlt size={35}/> </span> 
                        <span className={style.iconspantext}>Ubicacion</span> 
                    </div>
                    <span className={style.ubicationtext}><b>{event[1].placeName.toUpperCase()}</b>{`, ${event[1].address.address_line}`}</span>
                    <span className={style.ubicationtext}><b>{event[1].address.city}</b>{`, ${event[1].address.state} | ${event[1].address.country}`}</span>
                    <img src="https://motor.elpais.com/wp-content/uploads/2022/01/google-maps-22.jpg" alt="map" />
                </div>

                <div className={style.containerdate}>
                    <div className={style.containericon}>
                        <span className={style.iconspan}> <RiTicket2Fill size={35}/> </span> 
                        <span className={style.iconspantext}>Acerca del evento</span>
                    </div>
                    <div className={style.aboutevent}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>   
            </div>}
        </>
    )
}

export default CardDetail;