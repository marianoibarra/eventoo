import React from "react";
import { useSelector } from "react-redux";
import { FaMapMarkedAlt } from "react-icons/fa";
import Map from './MapDetail';
import style from "./EventLocation.module.css";

const EventLocation = () => {

    const { eventDetail } = useSelector(state => state.eventDetail);

    return(
        <>
            {eventDetail && 
                <div className={style.containerlocation}>
                    <div className={style.containericon}>
                        <span className={eventDetail.typePack === 'PREMIUM' ? style.iconspan_premium : style.iconspan}> <FaMapMarkedAlt size={30}/> </span> 
                        <span className={style.iconspantext}>Location</span> 
                    </div>
                    <span className={style.ubicationtext}>{`${eventDetail.address.address_line}, ${eventDetail.address.city}`}</span>
                    <span className={style.ubicationtext}><b>{eventDetail.address.state && `${eventDetail.address.state}, `}{eventDetail.address.country}</b></span>
                    <div className={style.containermap}>
                        <Map/>
                    </div>
                </div>
            }
        </>
    )
}

export default EventLocation;