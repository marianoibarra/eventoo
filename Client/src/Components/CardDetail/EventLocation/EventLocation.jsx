import React from "react";
import { useSelector } from "react-redux";
import { FaMapMarkedAlt } from "react-icons/fa";
import style from "./EventLocation.module.css";

const EventLocation = () => {

    const { eventDetail } = useSelector(state => state.eventDetail);

    return(
        <>
            {eventDetail && 
                <div className={style.containerlocation}>
                <div className={style.containericon}>
                    <span className={style.iconspan}> <FaMapMarkedAlt size={35}/> </span> 
                    <span className={style.iconspantext}>Location</span> 
                </div>
                <span className={style.ubicationtext}>{eventDetail.address.address_line}</span>
                <span className={style.ubicationtext}><b>{eventDetail.address.city}</b>{`, ${eventDetail.address.state} | ${eventDetail.address.country}`}</span>
                <img src="https://motor.elpais.com/wp-content/uploads/2022/01/google-maps-22.jpg" alt="map" />
                </div>
            }
        </>
    )
}

export default EventLocation;