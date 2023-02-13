import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { axiosModeEventsCreateForUser } from '../../../Slice/EventsCreateForUser/CreateForUserSlice';
import Styles from'./Create.module.css';
function Create() {
  const { events } = useSelector(state => state.eventsCreateForUserSlice)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(axiosModeEventsCreateForUser());
  }, [dispatch]);

  return (
    <div className={Styles.container}>
      {events.length > 0 ? events.map(event => (
        <div className={Styles.eventCard} key={event.name}>
          <Link to={`/event/${event.id}`}><h3 className={Styles.eventCardTitle}>Nombre: {event.name}</h3></Link>
          <p>Fecha de Inicio: {event.start_date}</p>
          <p>Fecha de Finalización: {event.end_time}</p>
          <p>creado: {event.isPaid ? 'Sí' : 'No'}</p>
          <p>Rango de Edad: {event.age_range}</p>
        </div>
      )) : undefined}
    </div>
  )
}

export default Create