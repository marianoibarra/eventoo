import React from 'react'
import Style from './CaruselCard.module.css'
import {Link} from 'react-router-dom'

const CaruselCard = ({ img, name, start_date, category, id }) => {
  return (
    <Link  to={`/Event/${id}`}>
      <div className={Style.container_card} style={{ backgroundImage: `url(${img})` }} >
        <div className={Style.container_details}>
          <h2 className={Style.details_date} >{start_date}</h2>
          <h3 className={Style.details_category}>{category}</h3>
          <h2 className={Style.details_title}>{name}</h2>
          {/* <div>
            <a className={`btnprimario btnMore`} >
              <span>INFO</span>
            </a>
          </div> */}
        </div>
      </div>
    </Link>
  )
}



export default CaruselCard


