import React from 'react'
import Style from './Tickets.module.css'

const Tickets = ({ name, last_name, email}) => {
  return (
    <div className={Style.container_ticket}>
      <h2>{name}</h2>
      <h2>{last_name}</h2>
      <h2>{email}</h2>
    </div>
  )
}

export default Tickets
