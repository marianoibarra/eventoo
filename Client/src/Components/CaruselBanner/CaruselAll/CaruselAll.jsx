import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Style from './CaruselAll.module.css'
import CaruselCard from './CaruselCard/CaruselCard'
import covers from '../../../imgs/covers/';
import { axiosCombinedFilter } from '../../../Slice/Filter/combinedFilterSlice';
import { getPremiumEvents } from '../../../Slice/PremiumEvents/PremiumEventsSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import CarouselPremium from './CarouselPremium/CarouselPremium';


const CaruselAll = () => {
  const dispatch = useDispatch()
  const { events, loading } = useSelector(state => state.events)
  const [moreEvents, setMoreEvents] = useState(10)


  useEffect(() => {
    dispatch(getPremiumEvents());
    dispatch(axiosCombinedFilter());
  }, [dispatch]);

  const handleMoreEvents = () => {
    setMoreEvents(moreEvents + 10)
  }

  return (
    <div className={Style.container_carusel}>
      
      <div className={Style.container_inPerson}>

        <CarouselPremium />

        <div className={Style.container_text}> Events  {`(${events.length})`} </div>
        <div className={Style.container_resultFilter} >
          {
            loading
              ?  <div className={Style.spinner}><div></div><div></div><div></div><div></div></div>
              : events.length > 0
                  ? events.slice(0, moreEvents).map(event => (
                      <CaruselCard
                        img={event.cover_pic ? event.cover_pic : covers[event.category?.name]}
                        key={event.id}
                        name={event.name}
                        start_date={event.start_date}
                        start_time={event.start_time}
                        isPaid={event.isPaid}
                        price={event.price}
                        category={event.category === null ? 'N/A' : event.category.name}
                        id={event.id}
                      />
                    )) 
                  : <div className={Style.notFoundWrapper}>
                      <FontAwesomeIcon icon={faHeartBroken} size="6x" />
                      <h4>No results found</h4>
                      <p>Please try with anothers keywords or filters</p>
                    </div>
          }
        </div>
        {
          events.length > 0 && moreEvents < events.length && !loading && 
            <a className={`btnprimario btnMore`} onClick={handleMoreEvents}>
              <span>MORE</span>
            </a>
        }
       
      </div>
    </div>
  )
}

export default CaruselAll
