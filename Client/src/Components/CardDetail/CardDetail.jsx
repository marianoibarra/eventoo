import React from "react";
import { TbDisabled, TbDisabledOff } from 'react-icons/tb' ;
import style from './CardDetail.module.css';

const CardDetail = () => {
    const initialEvent = {
        id: 1,
        name: 'Lila Downs',
        description: 'descripcion del evento descripcion del evento descripcion del evento descripcion del evento descripcion del evento descripcion del evento descripcion del evento',
        cover_pics: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/tour960.png',
        address: {
            address_line: "Marcelo T. de Alvear 1125",
            city: "",
            state: "Capital Federal (centro)",
            country: "Argentina",      
        },
        placeName: 'Teatro Coliseo',
        start_date: "2022-07-15",
        end_date: "2022-07-15",
        start_time: "20:00",
        end_time: "22:00",
        isPublic: true,
        disability_access: true,
        parking: true,
        isPaid: true              
    }
    return(
        <>
        <div className={style.containergeneral}>
            <div className={style.containerimage}>
                <img className={style.image} src={initialEvent.cover_pics} alt='cover_pics'/>
                <h1>{initialEvent.name.toUpperCase()}</h1>
            </div>
            <div className={style.containerdescription}>
                <p>{initialEvent.description}</p>
            </div>
        </div>
        <div className={style.containerprueba}>
            {initialEvent.disability_access ? 
            <div> <span className={style.iconspan}> <TbDisabled size={30}/> </span> <span className={style.iconspan2}>Acceso discapacitado</span> </div> : 
            <a className={style.iconspan}> <TbDisabledOff size={30}/> </a>}
        </div>
        </>
    )
}

export default CardDetail;