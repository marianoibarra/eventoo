import React from 'react'
import Style from './CaruselCard.module.css'

const CaruselCard = ({ name, start_date, category }) => {
  return (

    <div className={Style.container_card}>


      <div className={Style.container_details}>
        <h1 className={Style.details_text}>{name}</h1>
        <p>{start_date}</p>
        <p>{category}</p>
        <div>
          <a className={`btnprimario`} href='/Event'>
            <span>MORE</span>
          </a>
        </div>
      </div>
    </div>

  )
}

export default CaruselCard


