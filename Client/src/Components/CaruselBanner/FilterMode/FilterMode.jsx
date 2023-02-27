import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Style from './FilterMode.module.css'
import { MdEventSeat, MdDesktopMac, MdHistory, MdDateRange, MdDelete,MdOutlineTune } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { clearFilter, setFilter } from '../../../Slice/newFilter/newFilterSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import ModalFiltersHome from '../../Modal/ModalFiltersHome/ModalFiltersHome';

// MdEventSeat

const FilterMode = () => {

  const dispatch = useDispatch()
  const filter = useSelector(state => state.newFilter)
  const [someActive, setSomeActive] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if(filter.modality || filter.isToday || filter.isNextWeekend) {
      setSomeActive(true)
    } else {
      setSomeActive(false)
    }
  }, [filter])

  const handleClick = (e) => {
    if(e.target.name === 'clear') return dispatch(clearFilter());
    if(e.target.name === 'favorites') return dispatch(setFilter({[e.target.name]: !filter.favorites}))
    if(e.target.name === 'modal') return setShowModal(true);
    if(filter[e.target.name] === e.target.value) {
      dispatch(setFilter({[e.target.name]: null}))
    } else {
      dispatch(setFilter({[e.target.name]: e.target.value}))
    }
  }

  return (
    <div className={Style.containerFilterMode}>
      {showModal && <ModalFiltersHome setShowModal={setShowModal} />}
      {someActive && 
        <button name='clear' onClick={handleClick} className={Style.clearFilter}>
            <MdDelete style={{pointerEvents: 'none'}} size={20} />
        </button>
      }

      <div className={`${Style.favorites} ${someActive ? Style.border : ''}`}>
        <div className={Style.container_btns_favorites}>
          <button
            onClick={handleClick}
            className={`${Style.btn} ${filter.favorites ? Style.active : ''}`}
            name='favorites'>
            <AiFillStar style={{pointerEvents: 'none'}} /> Favorites
          </button>
        </div>

      </div>

      <div className={`${Style.modality} ${Style.border}`}>
        <div className={Style.container_btns_modality}>
          <button
            onClick={handleClick}
            value='Presential'
            className={`${Style.btn} ${filter.modality === 'Presential' ? Style.active : ''}`}
            name='modality'>
            <MdEventSeat style={{pointerEvents: 'none'}} /> Presential
          </button>
          <button
            onClick={handleClick}
            value='Virtual'
            className={`${Style.btn} ${filter.modality === 'Virtual' ? Style.active : ''}`}
            name='modality'>
            <MdDesktopMac style={{pointerEvents: 'none'}} /> Virtual
          </button>
        </div>
      </div>

      <div className={Style.date}>
        <div className={Style.container_btns_date}>
          <button
            onClick={handleClick}
            value={'true'}
            className={`${Style.btn} ${filter.isNextWeekend == 'true' ? Style.active : ''}`}
            name='isNextWeekend'>
            <MdDateRange style={{pointerEvents: 'none'}} />Next weekend
          </button>
          <button
            onClick={handleClick}
            value={'true'}
            className={`${Style.btn} ${filter.isToday == 'true' ? Style.active : ''}`}
            name='isToday'>
            <MdHistory style={{pointerEvents: 'none'}} /> Today
          </button>
        </div>
      </div>
      <button name='modal' onClick={handleClick} className={Style.moreFilter}>
          <MdOutlineTune style={{pointerEvents: 'none'}} size={20} />
      </button>
    </div>
  );
};

export default FilterMode
