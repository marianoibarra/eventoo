import React from 'react'
import Slider from "react-slick";
import Style from './CaruselAll.module.css'
import CaruselCard from './CaruselCard/CaruselCard'



const CaruselAll = () => {
  
    const settings = {
      className: "center",
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 4,
      swipeToSlide: true,     
    }
  
  return (
    <div className={Style.container_carusel}>
      <div className={Style.container_text}>All Event</div>
      <div>
        <Slider {...settings}>
          <CaruselCard />
          <CaruselCard />
          <CaruselCard />
          <CaruselCard />
          <CaruselCard />
          <CaruselCard />
          <CaruselCard />
          <CaruselCard />          
        </Slider>
      </div>
    </div>
  )
}

export default CaruselAll

