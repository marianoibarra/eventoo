import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import Style from './CaruselAll.module.css'
import CaruselCard from './CaruselCard/CaruselCard'
import { axiosCombinedFilter } from '../../../Slice/Filter/combinedFilterSlice';


const CaruselAll = () => {
  const dispatch = useDispatch()
  const { filter } = useSelector(state => state.combinedFilter)
  const [moreEvents, setMoreEvents] = useState(10)
  const imgDefault = "https://dummyimage.com/400x600/005D5E/fff&text=Eventoo"



  useEffect(() => {
    dispatch(axiosCombinedFilter());
  }, [dispatch]);

  const handleMoreEvents = () => {
    setMoreEvents(moreEvents + 10)
  }


  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
  }

  return (
    <div className={Style.container_carusel}>
      <div className={Style.container_selectFilter}>
        <div className={Style.container_text}>Favorite</div>
        <Slider {...settings}>
        </Slider>
      </div>

      <div className={Style.container_inPerson}>
        <div className={Style.container_text}> Event's  {`(${filter.length})`} </div>
        <div className={Style.container_resultFilter} >
          {filter.length > 0 ? filter.slice(0, moreEvents).map(event => (
            <CaruselCard
              img={event.cover_pic?.replace('x.png', '1200')+'.png&text=cover_pic'}
              key={event.id}
              name={event.name}
              start_date={event.start_date}
              category={event.category === null ? 'N/A' : event.category.name}
              id={event.id}
            />
          )) : <h2 className={Style.title_noReults}>No Results...</h2>

          }
        </div>
        <a className={`btnprimario btnMore`} onClick={handleMoreEvents}>
          <span>MORE</span>
        </a>
      </div>
    </div>
  )
}

export default CaruselAll
