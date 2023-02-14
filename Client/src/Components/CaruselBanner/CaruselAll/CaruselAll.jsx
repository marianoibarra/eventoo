import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import Style from './CaruselAll.module.css'
import CaruselCard from './CaruselCard/CaruselCard'
import covers from '../../../imgs/covers/';
import { axiosCombinedFilter } from '../../../Slice/Filter/combinedFilterSlice';


const CaruselAll = () => {
  const dispatch = useDispatch()
  const { events } = useSelector(state => state.events)
  const [moreEvents, setMoreEvents] = useState(10)

  useEffect(() => {
    dispatch(axiosCombinedFilter());
  }, [dispatch]);

  const handleMoreEvents = () => {
    setMoreEvents(moreEvents + 10)
  }

  return (
    <div className={Style.container_carusel}>
      <div className={Style.container_inPerson}>
        <div className={Style.container_text}> Events  {`(${events.length})`} </div>
        <div className={Style.container_resultFilter} >
          {events.length > 0 ? events.slice(0, moreEvents).map(event => (
            <CaruselCard
              img={event.cover_pic ? event.cover_pic : covers[event.category?.name]}
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
