import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { axiosCombinedFilter } from '../../../Slice/Filter/combinedFilterSlice';
import { axiosModeEvents } from '../../../Slice/Events/EventsSlice'
import Style from './FilterMode.module.css'
import { MdEventSeat, MdDesktopMac, MdHistory, MdDateRange, MdDelete,MdOutlineTune } from "react-icons/md";

// MdEventSeat

const FilterMode = () => {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.events)

  const [filter, setFilter] = useState([])
  const [isModality, setIsModality] = useState(null)
  const [selectBtn, setselectBtn] = useState(false)


  let resultSuperQuery = '';
  const properties = new Set();
  for (const prop in filter) {
    if (filter[prop] && filter[prop] !== null && filter[prop] !== false) {
      if (!properties.has(prop)) {
        resultSuperQuery += `&${prop}=${filter[prop]}`;
        properties.add(prop);
      }
    }

    console.log(resultSuperQuery, 'soy el superQUERY')
  }
  dispatch(axiosCombinedFilter(resultSuperQuery));

  useEffect(() => {
    dispatch(axiosModeEvents())
  }, [dispatch]);


  const handleClickModality = e => {
    // if (inputCity === e.target.value) return;
    setIsModality(e.target.value);
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    })
  }

  const handleClickDate = e => {
    if (selectBtn === e.target.name) return;
    if (e.target.name === 'isWeekend') {
      setFilter({
        ...filter,
        [e.target.name]: e.target.value,
        isToday: false
      })
    } else {
      setFilter({
        ...filter,
        [e.target.name]: e.target.value,
        isWeekend: false
      })
    }
    setselectBtn(e.target.name)
  }

  const handleClearFilter = () => {
    setFilter([])
    setIsModality(null)
    setselectBtn(false)
  };


  return (
    <div className={Style.containerFilterMode}>

      <div className={Style.Filter}>
          <div className={Style.title_filter}>Filter by: </div>
          <button onClick={handleClearFilter} className={Style.btnFilter}>
             <MdOutlineTune size={20} />
          </button>
      </div>

      <div className={Style.modality}>
        <div className={Style.container_btns_modality}>
          <button
            style={isModality === 'Presential' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClickModality}
            value='Presential'
            className={Style.btn}
            name='modality'>
            <MdEventSeat /> Presential
          </button>
          <button
            style={isModality === 'Virtual' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClickModality}
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
            style={selectBtn === 'isWeekend' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClickDate}
            value={true}
            className={Style.btn}
            name='isWeekend'>
            <MdDateRange />Weekend
          </button>
          <button
            style={selectBtn === 'isToday' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClickDate}
            value={true}
            className={Style.btn}
            name='isToday'>
            <MdHistory /> Today
          </button>
        </div>
      </div>

      <div className={Style.clearFilter}>
        <div className={Style.container_btns_clearFilter}>
          <button onClick={handleClearFilter} className={Style.btnClearFilter}>
            <MdDelete size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default FilterMode
