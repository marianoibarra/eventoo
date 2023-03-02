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
import { style } from '@mui/system';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';


const CaruselAll = () => {
  const dispatch = useDispatch()
  const { events, loading } = useSelector(state => state.events)
  const filter = useSelector(state => state.newFilter)
  const {favorites} = useSelector(state => state.favorites)
  const [moreEvents, setMoreEvents] = useState(10)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getPremiumEvents());
    dispatch(axiosCombinedFilter());
  }, [dispatch]);

  const handleMoreEvents = () => {
    setMoreEvents(moreEvents + 10)
  }

  const useStyles = makeStyles((theme) => ({
    fab: {
      backgroundColor: '#BC4001',
      textTransform: 'none',
      fontFamily: 'Poppins',
      fontWeight: 400,
      gap: '8px',
      alignItems: 'center',
      paddingRight: '18px',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#9F3200',
      },
    },
  }));
  
  const classes = useStyles();

  return (
    <div className={Style.container_carusel}>
      
      <div className={Style.container_inPerson}>

        {!filter.name && !filter.favorites && !filter.category && !filter.modality && !filter.isNextWeekend && !filter.isToday && <CarouselPremium />}

        <div className={Style.container_text}> Events  {`(${events.filter(filter.favorites ? e => favorites.some(f => f === e.id) : e => true).length})`} </div>

        <div className={Style.container_resultFilter} >
          {
            loading
              ?  <div className={Style.spinner}><div></div><div></div><div></div><div></div></div>
              : events.length > 0
                  ? events.slice(0, filter.favorites ? Infinity : moreEvents).filter(filter.favorites ? e => favorites.some(f => f === e.id) : e => true).map(event => (
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
                        premium={event.typePack === 'PREMIUM' ? true : false}
                        classic={event.typePack === 'CLASSIC' ? true : false}
                        home={true}
                      />
                    )) 
                  : <div className={Style.notFoundWrapper}>
                      <FontAwesomeIcon icon={faHeartBroken} size="6x" />
                      <h4>No results found</h4>
                      <p>Please try with anothers keywords or filters</p>
                    </div>
          }
        </div>
        <div className={Style.fab}>
          <Fab onClick={() => navigate("/create-event")} className={classes.fab} variant="extended" size='large'>
            <AddIcon />
            Create event
          </Fab>
        </div>
        
        {
          events.length > 0 && moreEvents < events.length && !loading && !filter.favorites &&
            <a className={`btnprimario btnMore`} onClick={handleMoreEvents}>
              <span>MORE</span>
            </a>
        }
       
      </div>
    </div>
  )
}

export default CaruselAll
