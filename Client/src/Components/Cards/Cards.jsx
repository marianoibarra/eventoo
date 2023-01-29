import React from 'react'
import Style from './Cards.module.css'
import CreateContainer from './CreateContainer';
import EventContainer from './EventContainer';

const Cards = () => {

    const details = {
        id: 1,
        nombre: "Create your event",
        explore: "Explore Eventoo",
        descripcion: "Planning an event doesn't have to be a hassle. Go for it and start planning your first event today!",
        descripcion2: "Look for an event of your liking among the hundreds of planners who always choose us"
    }


    return (
        <div className={Style.ContenedorDestacado}>
            <CreateContainer
                details={details} />
            <EventContainer
                details={details} />
        </div>
    );
}

export default Cards