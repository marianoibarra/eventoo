import React from "react";
import { useSelector } from "react-redux";
import { TbDisabled } from 'react-icons/tb' ;
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiFillCar } from 'react-icons/ai';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import { MdPets, MdSmokingRooms } from 'react-icons/md';
import style from './EventInformation.module.css';

const EventInformation = () => {

    const { eventDetail } = useSelector(state => state.eventDetail);

    return(
        <>
            {Object.keys(eventDetail).length > 0 && <div className={style.background}>
                {eventDetail.disability_access === true && 
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <TbDisabled size={35}/> </span> 
                        <span className={style.iconspantext}>Acceso discapacitado</span> 
                    </div>
                }
                {eventDetail.parking === true &&
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <AiFillCar size={35}/> </span> 
                        <span className={style.iconspantext}>Estacionamiento</span> 
                    </div>
                }
                {eventDetail.pet_friendly === true &&
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <MdPets size={35}/> </span> 
                        <span className={style.iconspantext}>Mascotas Permitidas</span> 
                    </div>                 
                }
                {eventDetail.smoking_zone === true &&
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <MdSmokingRooms size={35}/> </span> 
                        <span className={style.iconspantext}>Zona Fumador</span> 
                    </div>  
                } 
                {eventDetail.isPublic === true ?
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <BsFillPeopleFill size={35}/> </span> 
                        <span className={style.iconspantext}>Acceso Publico</span> 
                    </div> :
                    <div className={style.containericon}> 
                        <span className={style.iconspan}> <RiGitRepositoryPrivateFill size={35}/> </span> 
                        <span className={style.iconspantext}>Acceso Privado</span> 
                    </div>              
                }
            </div>}
        </>
    )
}

export default EventInformation;