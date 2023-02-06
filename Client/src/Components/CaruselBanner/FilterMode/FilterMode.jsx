import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import { axiosCombinedFilter } from '../../../Slice/Filter/combinedFilterSlice';
import Style from './FilterMode.module.css'

const FilterMode = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(state => state.categories.categories);
  const [selectedModality, setSelectedModality] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);

  //Const para el filtro SuperQuery
  const [city, setCity] = useState(null)
  const [category, setCategory] = useState(null)

  const filter = {
    modality: selectedModality,
    city: city,
    category: category
  }
  let query = {}
  let resultSuperQuery = ''

  for (let prop in filter) {
    if (filter[prop] !== null) {
      query[prop] = filter[prop]
    }
  }
  for (let prop in query) {
    if (query[prop] === null || query[prop].length > 1)
    {  resultSuperQuery += `&${prop}=${query[prop]}`}
    dispatch( axiosCombinedFilter(resultSuperQuery));
  }

  useEffect(() => {
    dispatch(axiosModeCategories());
    dispatch( axiosCombinedFilter(resultSuperQuery))
  }, [dispatch]);

  useEffect(() => {
    if (!loading && categories) {
      setFilteredCategories(categories.filter(c => c.modality === selectedModality));
    }
  }, [categories, loading, selectedModality]);



  const handleChange = e => {
    setSelectedModality(e.target.value);
  };

  const handleCityChange = e => {
    setCity(e.target.value)
  }

  const handleCategoryChange = e => {
    setCategory(e.target.value)
  }

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
        <h2 className={Style.titleFilter}>In</h2>
        <input placeholder='' onChange={handleCityChange} ></input>
      </div>

      <div className={Style.search}>
        <h2 className={Style.titleFilter}>Search</h2>
        <select className={Style.select_Looking} name="" id="">
          <option selected disabled hidden>event</option>
        </select>
      </div>

    </div>
  );
};

export default FilterMode


//onChange={handleSelectFilter}


  // const handleSelectFilter = e => {
  //   dispatch(setCombinedFilter(e.target.value));
  // }



  // const handleCity = e => {
  //   console.log(e.target.value)
  //   setSearchCity(e.target.value)
  // }

  // const handleSuperQuery = () => {
  //   let query = ''
  //   if (searchCity) {
  //     query += 'city=' + searchCity + '&'
  //   }
  //   if (searchMode) {
  //     query += 'modality=' + searchMode + '&'
  //   }
  //   if (searchCategory) {
  //     query += 'categories=' + searchCategory + '&'
  //   }
  //   dispatch(axiosModeCategories(query))
  // }