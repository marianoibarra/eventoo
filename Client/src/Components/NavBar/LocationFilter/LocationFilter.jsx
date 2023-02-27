import React, { useRef, useState, useEffect } from 'react'
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { TiLocationArrow } from "react-icons/ti";
import styles from './LocationFilter.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../Slice/newFilter/newFilterSlice'
import GoogleMaps from '../../Modal/ModalSession/MapRegister';

const LocationFilter = () => {

  const [stateSelected, setStateSelected] = useState({})
  const [locationIsOpen, setLocationIsOpen] = useState(false)
  const dropdownRef = useRef()
  const filter = useSelector(state => state.newFilter)
  const {isLogged} = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    const acMap = document.getElementsByClassName('MuiAutocomplete-popper')[0]
    if(acMap) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !acMap.contains(e.target)) {
        setLocationIsOpen(false)
      } 
    } else {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLocationIsOpen(false)
      } 
    }
  }

  useEffect(() => {
    stateSelected.state !== null && stateSelected.state !== undefined && dispatch(setFilter({state: stateSelected.state}))
  }, [stateSelected])



  return (
    <div ref={dropdownRef} className={styles.location}>
      <div onClick={() => setLocationIsOpen(!locationIsOpen)} className={styles.toggleLocation}>
        <HiOutlineLocationMarker color="#fffa" size={20}/>
        {filter.state === null || filter.state.length === 0 ? 'Everywhere' : filter.state}
        <BiChevronDown color="#fffa" size={18}/>
      </div>
      <div className={locationIsOpen ? styles.locationDropdownOpen : styles.locationDropdownClose}>
        <div className={styles.locationDropdownWrapper}>
          <div className={styles.locationDropdownBody}>
            <h4>Select your location</h4>
            <GoogleMaps setInput={setStateSelected} input={stateSelected} size='360x120' save load />           
          </div>
          <div className={styles.locationDropdownFooter}>
            <div className={styles.locationGPS}>
              <TiLocationArrow size={24} />
              Use current location
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationFilter