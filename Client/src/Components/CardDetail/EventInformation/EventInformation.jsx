import React from "react";
import { useSelector } from "react-redux";
import { TbDisabled, TbDisabledOff, TbParking, TbParkingOff } from 'react-icons/tb' ;
import { BsFillPeopleFill } from 'react-icons/bs';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import { MdPets, MdSmokingRooms, MdSmokeFree } from 'react-icons/md';
import style from './EventInformation.module.css';

const EventInformation = () => {

    const { eventDetail } = useSelector(state => state.eventDetail);

    return(
        <>
            {Object.keys(eventDetail).length > 0 && <div className={style.background}>
                {eventDetail.category && 
                    <div className={style.containercategory}>
                        <span className={style.iconspantext}>{eventDetail.category.name}</span> 
                    </div>                    
                }

                {<div className={style.containericon}> 
                    {eventDetail.disability_access === true ? 
                        <span className={style.iconspan}> <TbDisabled size={37}/> </span>
                        : <span className={style.iconspan}> <TbDisabledOff size={37}/> </span>}
                    <span className={style.iconspantext}>Disability Access</span> 
                </div>}

                {<div className={style.containericon}> 
                    {eventDetail.parking === true ? 
                        <span className={style.iconspan}> <TbParking size={37}/> </span>
                        : <span className={style.iconspan}> <TbParkingOff size={37}/> </span>}
                    <span className={style.iconspantext}>Parking</span> 
                </div>}

                {eventDetail.pet_friendly === true &&
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <MdPets size={37}/> </span> 
                        <span className={style.iconspantext}>Pet Friendly</span> 
                    </div>                 
                }

                {eventDetail.smoking_zone === true ?
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <MdSmokingRooms size={37}/> </span> 
                        <span className={style.iconspantext}>Smoking Zone</span> 
                    </div> :
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <MdSmokeFree size={37}/> </span> 
                        <span className={style.iconspantext}>Smoke Free</span> 
                    </div>              
                }

                {eventDetail.isPublic === true ?
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <BsFillPeopleFill size={37}/> </span> 
                        <span className={style.iconspantext}>Public Access</span> 
                    </div> :
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <RiGitRepositoryPrivateFill size={37}/> </span> 
                        <span className={style.iconspantext}>Private Access</span> 
                    </div>              
                }
            </div>}
        </>
    )
}

export default EventInformation;