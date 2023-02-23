import React from 'react'
import {  useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import SpinnerWhite from '../../../utils/SpinnerWhite/SpinnerWhite';
import Styles from '../Create/Create.module.css';

function Buys() {

  const { data: {buys: eventsBuyed}, loading: {get: loading} } = useSelector(state => state.eventsManagement)

  return (
    <div className={Styles.container}>
      {!loading
        ? eventsBuyed.map(transaction => (
            <div className={Styles.eventCard} key={transaction.event.name}>
              <Link to={`/Event/${transaction.event.id}`}><h3 className={Styles.eventCardTitle}>Name: {transaction.event.name}</h3></Link>
              <p>Start date: {transaction.event.start_date}</p>
              <p>End date: {transaction.event.end_date}</p>
              <p>Category: {transaction.eventcategory?.name}</p>
              <p>Age range: {transaction.event.age_range}</p>
              <p id={transaction.status}>Status: {transaction.status}</p>

            </div>
          ))
      : <SpinnerWhite />
    }
    </div>
  )
}

export default Buys
