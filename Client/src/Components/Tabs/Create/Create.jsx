import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Styles from'./Create.module.css';

function Create() {

  const { data: {eventsCreated}, loading: {get: loading} } = useSelector(state => state.eventsManagement)

  return (
    <div className={Styles.container} >
      {Array.isArray(eventsCreated) && eventsCreated.length !== 0 && eventsCreated.map(event => (
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