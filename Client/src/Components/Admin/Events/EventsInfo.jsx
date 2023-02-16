import React from "react";
import Styles from "../Categories/Category.module.css";

const EventsInfo = ({
  events,
  showDetails,
  setShowDetails,
  handleChange,

}) => (
  <>
    {Array.isArray(events) &&
      events.map((event) => (
        <div className={Styles.eventCard} key={event?.id}>
          <h3 className={Styles.eventCardTitle}>Nombre: {event?.name}</h3>
          <p>
            Organizador: {event?.organizer?.name && event?.organizer?.last_name}
          </p>
          <p>Status{event?.isActive? ' Actived' : 'Desactived'}</p>
     { showDetails === event?.id ? (
            <>    <p>Fecha de Finalización: {event?.end_time}</p>
          <p>Category: {event?.category?.modality}</p>
          <button onClick={()=>handleChange(event)}>Pause</button> </>
          ) : undefined}
          {showDetails !== event?.id ?
            <button onClick={() =>{ 
                setShowDetails(event?.id)
              }}>
              Change data
            </button> : undefined}
        </div>
      ))}
  </>
);

export default EventsInfo;


