import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategory,
  updateVirtualURL,
} from "../../../Slice/CreateEvent/CreateEvent";
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import style from "./Category.module.css";
import Map from "./Map";
import ButtonGroup from "./ButtonGroup";

function Category({input, setInput, errors, setShowMsg, showMsg}) {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories.categories
  );
  const [selectedModality, setSelectedModality] = useState('Presential');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const selectRef = useRef()

  useEffect(() => {
    dispatch(axiosModeCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && categories) {
      setFilteredCategories(
        categories.filter((c) => c.modality === selectedModality)
      );
    }
  }, [categories, loading, selectedModality]);

  const handleChanges = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleGroup = (e) => {
    setSelectedModality(e.target.name);
    selectRef.current.value = ''
    setInput({
      ...input,
      category: null
    })
  };

  return (
    <div className={style.info}>
      <p className={style.text}>
        Help locate your event and make sure attendees know where to go.
      </p>
      <div>
        <ButtonGroup
          buttons={["Presential", "Virtual"]}
          handleGroup={handleGroup}
        />
      </div>
      <div>
        
        {selectedModality && (
          <div>
            <div>
              {selectedModality === "Presential" ? (
                <Map input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg} />
              ) : (
                <input
                  className={style.inputs}
                  name='virtualURL'
                  type="text"
                  placeholder="URL"
                  onChange={handleChanges}
                />
              )}
              {filteredCategories.length > 0 && (
                <div>
                  Category:
                  <select ref={selectRef} name="category" className={style.select} onChange={handleChanges}>
                    <option value="" selected disabled hidden>Choose here</option>
                    {filteredCategories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
