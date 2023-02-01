import React from 'react'
import Style from './CaruselCard.module.css'

const CaruselCard = () => {
  return (

    <div className={Style.container_card}>
     

      <div className={Style.container_details}>
        <h1 className={Style.details_text}></h1>
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


