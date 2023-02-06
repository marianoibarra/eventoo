import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import Style from './CaruselAll.module.css'
import CaruselCard from './CaruselCard/CaruselCard'
import { axiosModeEvents } from '../../../Slice/Events/EventsSlice';


const CaruselAll = () => {
  const dispatch = useDispatch()
  const { filter } = useSelector(state => state.categories)
  const { events } = useSelector(state => state.events)
  const [filteredEvents, setFilteredEvents] = useState([])
  const [presentialEvents, setpresentialEvents] = useState([])

  useEffect(() => {
    setFilteredEvents(events?.filter(e => e.category && e.category.name === filter))
    setpresentialEvents(events?.filter(e => e.category && e.category.modality === 'Presential'))
  }, [filter, events]);


  useEffect(() => {
    dispatch(axiosModeEvents());
  }, [dispatch]);

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
        <div className={Style.container_text}>Presencial {`(${filteredEvents.length}`})</div>
        <Slider {...settings}>
          {filteredEvents?.slice(0, 9).map(event => (
            <CaruselCard
              key={event.id}
              name={event.name}
              start_date={event.start_date}
              category={event.category === null ? 'N/A' : event.category.name}
            />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default CaruselAll



{/* <div className={Style.container_carusel}>
<div className={Style.container_selectFilter}>
  <div className={Style.container_text}>{filter ? filter : 'All events'}</div>
  {console.log(filteredEvents.length, events.length)}
  <Slider {...settings}>
    {filteredEvents.length !== 0 ? filteredEvents.map(event => (
      <CaruselCard
        key={event.id}
        name={event.name}
        start_date={event.start_date}
        category={event.category.name}
      />
    )) : events && events.slice(0,9).map(event => (
        <CaruselCard
          key={event.id}
          name={event.name}
          start_date={event.start_date}
          category={event.category === null ? 'N/A' : event.category.name}
        />
      ))}
  </Slider>
</div>

<div className={Style.container_inPerson}>
  <div className={Style.container_text}>Presencial</div>
  <Slider {...settings}>
    {presentialEvents?.slice(0, 9).map(event => (
      <CaruselCard
        key={event.id}
        name={event.name}
        start_date={event.start_date}
        category={event.category === null ? 'N/A' : event.category.name}
      />
    ))}
  </Slider>
</div>

<div className={Style.container_online}>
  <div className={Style.container_text}>Online</div>
  <Slider {...settings}>
    {onlineEvents?.slice(10, 21).map(event => (
      <CaruselCard
        key={event.id}
        name={event.name}
        start_date={event.start_date}
        category={event.category === null ? 'N/A' : event.category.name}
      />
    ))}
  </Slider>
</div>

</div> */}