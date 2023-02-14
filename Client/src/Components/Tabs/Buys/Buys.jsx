import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { axiosModeEventsBuys } from '../../../Slice/EventsBuysForUser/BuysSlice';
import Styles from '../Create/Create.module.css';

function Buys() {
  const { events } = useSelector(state => state.eventsBuysSlice)

  console.log(events)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(axiosModeEventsBuys());
  }, [dispatch]);

  return (
    <div className={Styles.container}>
      {Array.isArray(events) && events.length !== 0 && events.map(event => (
        <div className={Styles.eventCard} key={event?.name}>
          <Link to={`/event/${event?.id}`}><h3 className={Styles.eventCardTitle}>Name: {event?.name}</h3></Link>
          <p>Start date: {event?.start_date}</p>
          <p>End date: {event?.end_date}</p>
          <p>Category: {event.category?.name}</p>
          <p>Age range: {event?.age_range}</p>
          <p id={event?.status}>Status: {event?.status}</p>

        </div>
      ))}
    </div>
  )
}

export default Buys
