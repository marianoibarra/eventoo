import React from 'react'
import Style from './CaruselCard.module.css'
import {Link} from 'react-router-dom'
import moment from 'moment'

const CaruselCard = ({ img, name, start_date, start_time, category, id, isPaid, price }) => {
  
  const genDate = () => {
    const [hour, minute] = start_time.split(':')
    const date = new Date(start_date)
    date.setHours(hour)
    date.setMinutes(minute)
    return date
  }
  
  
  const date = start_time && start_date ? genDate() : null
  
  return (
    <Link  to={`/Event/${id}`}>
      <div className={Style.container_card}>
          <img src={img} alt={name} />
        <div className={Style.container_details}>
          {name && <h2 className={Style.details_title}>{name}</h2>}
          {date && <span className={Style.details_date} >{moment(date).format('ddd, MMMM Do, h:mm')}</span>}
          <span className={Style.details_category}>{category}</span>
          <span className={Style.details_price}>{isPaid ? `${price}` : "FREE"}</span>
        </div>
      </div>
    </Link>
  )
}



export default CaruselCard


