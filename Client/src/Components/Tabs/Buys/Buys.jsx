import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { axiosModeEventsBuys } from '../../../Slice/EventsBuysForUser/BuysSlice';
import Styles from '../Create/Create.module.css';

function Buys() {
  const { events } = useSelector(state => state.eventsBuysSlice)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(axiosModeEventsBuys());
  }, [dispatch]);

  return (
    <div className={Styles.container}>
      {events.length > 0 ? events.map(event => (
        <div className={Styles.eventCard} key={event.name}>
          <Link to={`/event/${event.id}`}><h3 className={Styles.eventCardTitle}>Nombre: {event.name}</h3></Link>
          <p>Fecha de Inicio: {event.start_date}</p>
          <p>Fecha de Finalización: {event.end_time}</p>
          <p>pagado: {event.isPaid ? 'Sí' : 'No'}</p>
          <p>Rango de Edad: {event.age_range}</p>
        </div>
      )) : undefined}
    </div>
  )
}

export default Buys
