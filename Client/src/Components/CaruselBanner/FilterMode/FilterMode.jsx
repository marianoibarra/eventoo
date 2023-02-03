import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import Style from './FilterMode.module.css'

const FilterMode = () => {
  const dispatch = useDispatch();//                      STATE GLOBAL.REDUCER.PROPIEDADREDUCER
  const { categories, loading, error } = useSelector(state => state.categories.categories);
  const [selectedModality, setSelectedModality] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    dispatch(axiosModeCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && categories) {
      setFilteredCategories(categories.filter(c => c.modality === selectedModality));
    }
  }, [categories, loading, selectedModality]);

  const handleChange = event => {
    setSelectedModality(event.target.value);
  };

  return (
    <div className={Style.containerFilterMode}>

      <div className={Style.looking}>
        <h2 className={Style.titleFilter}>Looking For</h2>
        <select className={Style.select_Looking} onChange={handleChange}>
          <option selected disabled hidden>Mode</option>
          <option value="Presential">presential</option>
          <option value="Virtual">virtual</option>
        </select>
        {selectedModality && (
          <select className={Style.select_Looking} >
            {filteredCategories.map(c => (
              <option className={Style.opcionSelect} key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        )}
      </div>

      <div className={selectedModality === 'Virtual' ? Style.noVisibility : Style.state}>
        <h2 className={Style.titleFilter}>In</h2>
        <select className={Style.select_Looking} name="" id="">
          <option selected disabled hidden>Buenos Aires</option>

        </select>
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




{/* <div className={Style.containerFilterMode}>
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
</div> */}