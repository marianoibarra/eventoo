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
    <div className={Styles.container} >
      {Array.isArray(events) && events.length !== 0 && events.map(event => (
        <div className={Styles.eventCard}  key={event?.name}>
          <Link to={`/Event/${event?.id}`}><h3 className={Styles.eventCardTitle}>Name: {event?.name}</h3></Link>
          <p>Start date: {event?.start_date}</p>
          <p>End date: {event?.end_date}</p>
          <p>Category: {event?.category.name}</p>
          <p>Age range: {event?.age_range}</p>
    
          <p className={event.isPublic ? Styles.public : Styles.private}>{event.isPublic ? 'Public' : 'Private'} </p>
        </div>
      ))}
    </div>
  )
}

export default Create