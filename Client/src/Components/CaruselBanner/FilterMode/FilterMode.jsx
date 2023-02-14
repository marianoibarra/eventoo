import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { axiosCombinedFilter } from '../../../Slice/Filter/combinedFilterSlice';
import { getEvents } from '../../../Slice/Events/EventsSlice'
import Style from './FilterMode.module.css'
import { MdEventSeat, MdDesktopMac, MdHistory, MdDateRange, MdDelete,MdOutlineTune } from "react-icons/md";
import { setFilter } from '../../../Slice/newFilter/newFilterSlice';

// MdEventSeat

const FilterMode = () => {

  const dispatch = useDispatch()
  const filter = useSelector(state => state.newFilter)

  const handleClick = (e) => {
    if(e.target.name === 'clear') return console.log('clear')
    if(filter[e.target.name] === e.target.value) {
      dispatch(setFilter({[e.target.name]: null}))
    } else {
      dispatch(setFilter({[e.target.name]: e.target.value}))
    }
  }

  


  return (
    <div className={Style.containerFilterMode}>

      <div className={Style.Filter}>
          <div className={Style.title_filter}>Filter by: </div>
          <button onClick={handleClick} className={Style.btnFilter}>
             <MdOutlineTune size={20} />
          </button>
      </div>

      <div className={Style.modality}>
        <div className={Style.container_btns_modality}>
          <button
            style={filter.modality === 'Presential' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClick}
            value='Presential'
            className={Style.btn}
            name='modality'>
            <MdEventSeat /> Presential
          </button>
          <button
            style={filter.modality === 'Virtual' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClick}
            value='Virtual'
            className={Style.btn}
            name='modality'>
            <MdDesktopMac /> Virtual
          </button>
        </div>
      </div>

      <div className={Style.date}>
        <div className={Style.container_btns_date}>
          <button
            style={filter.isNextWeekend == 'true' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClick}
            value={'true'}
            className={Style.btn}
            name='isNextWeekend'>
            <MdDateRange />Weekend
          </button>
          <button
            style={filter.isToday == 'true' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClick}
            value={'true'}
            className={Style.btn}
            name='isToday'>
            <MdHistory /> Today
          </button>
        </div>
      </div>

      <div className={Style.clearFilter}>
        <div className={Style.container_btns_clearFilter}>
          <button name='clear' onClick={handleClick} className={Style.btnClearFilter}>
            <MdDelete size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default FilterMode
