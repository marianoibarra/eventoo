import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Style from './FilterMode.module.css'
import { MdEventSeat, MdDesktopMac, MdHistory, MdDateRange, MdDelete,MdOutlineTune } from "react-icons/md";
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
      <div className={`${Style.modality} ${someActive ? Style.border : ''}`}>
        <div className={Style.container_btns_modality}>
          <button
            style={filter.modality === 'Presential' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClick}
            value='Presential'
            className={Style.btn}
            name='modality'>
            <MdEventSeat style={{pointerEvents: 'none'}} /> Presential
          </button>
          <button
            style={filter.modality === 'Virtual' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClick}
            value='Virtual'
            className={Style.btn}
            name='modality'>
            <MdDesktopMac style={{pointerEvents: 'none'}} /> Virtual
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
            <MdDateRange style={{pointerEvents: 'none'}} />Next weekend
          </button>
          <button
            style={filter.isToday == 'true' ? { opacity: 1 } : { opacity: 0.6 }}
            onClick={handleClick}
            value={'true'}
            className={Style.btn}
            name='isToday'>
            <MdHistory style={{pointerEvents: 'none'}} /> Today
          </button>
        </div>
      </div>
      <button name='modal' onClick={handleClick} className={Style.clearFilter}>
          <MdOutlineTune style={{pointerEvents: 'none'}} size={20} />
      </button>
    </div>
  );
};

export default FilterMode
