import React from 'react'
import Style from './FilterMode.module.css'

const FilterMode = () => {
  return (
    <div className={Style.containerFilterMode}>
      <div className={Style.looking}>
        <h2 className={Style.titleFilter}>Looking For</h2>
        <select className={Style.select_Looking} name="" id="">
          <option selected disabled hidden>Mode</option>
          <option value="">IN-Person</option>
          <option value="">Online</option>
        </select>
      </div>
      <div className={Style.state}>
        <h2 className={Style.titleFilter}>In</h2>
        <select className={Style.select_Looking} name="" id="">
          <option selected disabled hidden>Buenos Aires</option>
          <option value="">IN-Person</option>
          <option value="">Online</option>
        </select>
      </div>
      <div className={Style.where}>
        <h2 className={Style.titleFilter}>Where</h2>
        <select className={Style.select_Looking} name="" id="">
          <option selected disabled hidden>Date</option>
          <option value="">IN-Person</option>
          <option value="">Online</option>
        </select>
      </div>
    </div>
  )
}

export default FilterMode