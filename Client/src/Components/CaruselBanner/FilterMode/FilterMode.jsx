import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import { axiosCombinedFilter } from '../../../Slice/Filter/combinedFilterSlice';
import { axiosModeEvents } from '../../../Slice/Events/EventsSlice'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Style from './FilterMode.module.css'
import Chip from '@mui/material/Chip';
import { BsCalendarDay } from "react-icons/bs";

const FilterMode = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(state => state.categories.categories);
  const { events } = useSelector(state => state.events)
  const [selectedModality, setSelectedModality] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);

  //Esta constante guarda todo las city de los eventos que luego se pasan a const [city, setCity] = useState(nameCity);
  const nameCity = [...new Set(events.filter(event => event?.address.city).map(event => event?.address.city))];


  //BLOQUE DE CODIGO PARA SUPERQUERY
  //Const para el filtro SuperQuery
  const [category, setCategory] = useState(null)
  const [city, setCity] = useState(nameCity);
  const [inputCity, setInputCity] = useState('')
  const [isWeekend, setisWeekend] = useState(false);
  const [isToday, setisToday] = useState(false);




  const handleChange = e => {
    setSelectedModality(e.target.value);
    setCity('')
    setCategory('')
  };

  // const handleClickWeekend = () => {
  //   setisWeekend(!isWeekend);
  //   console.log(isWeekend,'soy el weekend')
  // };

  // const handleClicToday = () => {
  //   setisToday(!isToday);
  // };

  const handleCityChange = e => {
    setCity(e.target.value);
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value)
  }


  const filter = {
    modality: selectedModality,
    city: city,
    category: category,
    isToday: isToday,
    isNextWeekend: isWeekend
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
    if (query[prop] === null || query[prop].length > 1 || query[prop] !== false) { resultSuperQuery += `&${prop}=${query[prop]}` }
    // console.log(resultSuperQuery, "soy la url")
    setTimeout(() => {
      dispatch(axiosCombinedFilter(resultSuperQuery));
    }, 500);
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
        <h2 className={Style.titleFilter_Looking}>Looking For</h2>
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
        <h2 className={Style.titleFilter_Where}>Where</h2>
        <div className={Style.input_city} onChange={handleCityChange}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={nameCity}
            sx={{ width: 419 }}
            city={city}
            onChange={(event, newCity) => {
              setCity(newCity);
            }}
            inputCity={inputCity}
            onInputChange={(event, newInputCity) => {
              setInputCity(newInputCity);
            }}

            renderInput={(params) => <TextField {...params} label="City" />}
          />
        </div>
      </div>

      <div className={Style.search}>
        <h2 className={Style.titleFilter_When}>When</h2>
        {/* <Chip label='Weekend' icon={<BsCalendarDay />} color="success" onClick={handleClickWeekend} />
        <Chip label='Today' icon={<BsCalendarDay />} color="success" onClick={handleClicToday} /> */}
      </div>
    </div>
  );
};

export default FilterMode




{/* <select className={Style.select_Looking}>
<option selected disabled hidden>Date</option>
<option value="Weekend" >Weekend</option>
<option value="Today" >Today</option>
</select> */}