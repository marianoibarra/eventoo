import React from 'react'
import Style from './Tickets.module.css'

const Tickets = ({ name, last_name, email, id }) => {
  return (
    <div className={Style.container_ticket}>
      <div className={Style.container_ticket_title}>
        <h1 className={Style.ticket_title}>Ticket {id + 1}</h1>
      </div>
      <div className={Style.container_ticket_data}>
        <h2 className={Style.ticket_lastName}>{last_name}</h2>
        <p className={Style.ticket_name}>{name}</p>
        <p className={Style.ticket_email}>{email}</p>
      </div>
    </div>
  )
}

export default Tickets
