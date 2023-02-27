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
            {eventDetail && Object.keys(eventDetail).length > 0 && <div className={style.background}>

                {eventDetail.disability_access === true &&
                    <div className={style.containericon}> 
                        <span className={`${style.iconspan} ${eventDetail.typePack === 'PREMIUM' && style.iconspan_premium}`}> <TbDisabled size={30}/> </span>
                        <span className={style.iconspantext}>Disability Access</span> 
                    </div>
                }

                {eventDetail.parking === true &&
                    <div className={style.containericon}>   
                        <span className={`${style.iconspan} ${eventDetail.typePack === 'PREMIUM' && style.iconspan_premium}`}> <TbParking size={30}/> </span>
                        <span className={style.iconspantext}>Parking</span>
                    </div>
                }

                {eventDetail.pet_friendly === true &&
                    <div className={style.containericon}> 
                        <span className={`${style.iconspan} ${eventDetail.typePack === 'PREMIUM' && style.iconspan_premium}`}> <MdPets size={30}/> </span> 
                        <span className={style.iconspantext}>Pet Friendly</span> 
                    </div>                 
                }

                {eventDetail.smoking_zone === true &&
                    <div className={style.containericon}> 
                        <span className={`${style.iconspan} ${eventDetail.typePack === 'PREMIUM' && style.iconspan_premium}`}> <MdSmokingRooms size={30}/> </span> 
                        <span className={style.iconspantext}>Smoking Zone</span> 
                    </div>             
                }

                {eventDetail.isPublic === true ?
                    <div className={style.containericon}> 
                        <span className={`${style.iconspan} ${eventDetail.typePack === 'PREMIUM' && style.iconspan_premium}`}> <BsFillPeopleFill size={30}/> </span> 
                        <span className={style.iconspantext}>Public Access</span> 
                    </div> :
                    <div className={style.containericon}> 
                        <span className={`${style.iconspan} ${eventDetail.typePack === 'PREMIUM' && style.iconspan_premium}`}> <RiGitRepositoryPrivateFill size={30}/> </span> 
                        <span className={style.iconspantext}>Private Access</span> 
                    </div>              
                }
            </div>}
        </>
    )
}

export default EventInformation;