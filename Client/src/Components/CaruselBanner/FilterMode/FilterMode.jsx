import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import { axiosCombinedFilter } from '../../../Slice/Filter/combinedFilterSlice';
import { axiosModeEvents } from '../../../Slice/Events/EventsSlice'
import Style from './FilterMode.module.css'

const FilterMode = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(state => state.categories.categories);
  const { events } = useSelector(state => state.events)


  const [selectedModality, setSelectedModality] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [value, setValue] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState([])


  //BLOQUE DE CODIGO PARA SUPERQUERY
  //Const para el filtro SuperQuery
  const [category, setCategory] = useState(null)
  const [weekend, setWeekend] = useState(null)
  const [today, setToday] = useState(null)
  const [city, setCity] = useState(null)
  

  const handleChange = e => {
    setSelectedModality(e.target.value);
    document.getElementById("cityInput").value = "";
    setCity('')
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setCity(event.target.value);
    }
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value)
  }

  const handleWeekendChange = e => {
    setWeekend(e.target.value)
  }

  const handleTodayChange = e => {
    setToday(e.target.value)
  }

  const filter = {
    modality: selectedModality,
    city: city,
    category: category,
    isToday: today,
    isNextWeekend: weekend
  }
  let query = {}
  let resultSuperQuery = ''
  //For in que filtra los null del filter
  for (let prop in filter) {
    if (filter[prop] !== null) {
      query[prop] = filter[prop]
    }
  }

  //For in que concatena el query para armar la URL
  for (let prop in query) {
    if (query[prop] === null || query[prop].length > 1) { resultSuperQuery += `&${prop}=${query[prop]}` }    
    dispatch(axiosCombinedFilter(resultSuperQuery));
    resultSuperQuery = ''
    console.log(resultSuperQuery,'me borre')
  }


  useEffect(() => {
    dispatch(axiosModeCategories());
    dispatch(axiosModeEvents())
  }, [dispatch]);

  useEffect(() => {
    if (!loading && categories) {
      setFilteredCategories(categories.filter(c => c.modality === selectedModality));
    }
  }, [categories, loading, selectedModality]);



  return (
    <div className={Style.containerFilterMode}>

      <div className={Style.looking}>
        <h2 className={Style.titleFilter}>Looking For</h2>
        <select className={Style.select_Looking} onChange={handleChange}>
          <option selected disabled hidden>Mode</option>
          <option value="Presential" >presential</option>
          <option value="Virtual" >virtual</option>
        </select>
        {selectedModality && (
          <select className={Style.select_Looking} onChange={handleCategoryChange}>
            {filteredCategories.map(c => (
              <option className={Style.opcionSelect} key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        )}
      </div>

      <div className={selectedModality === 'Virtual' ? Style.noVisibility : Style.state}>
        <h2 className={Style.titleFilter}>Where</h2>
        <input className={Style.input_city} placeholder='Enter City' id='cityInput' onKeyDown={handleKeyPress} />
      </div>

      <div className={Style.search}>
      <h2 className={Style.titleFilter}>When</h2>
        <select className={Style.select_Looking}>
          <option selected disabled hidden>Date</option>
          <option value="Weekend" >Weekend</option>
          <option value="Today" >Today</option>
        </select>

      </div>
    </div>
  );
};

export default FilterMode

{/* <h2 className={Style.titleFilter}>Search</h2>
<input placeholder='' />
<ul>
  {filteredSuggestions.map(s => {
    <li key={s}>{s}</li>
  })}
</ul> */}