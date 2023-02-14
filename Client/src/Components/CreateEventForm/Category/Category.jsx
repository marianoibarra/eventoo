import React, {useState , useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setMesaggeError, updateCategory, updateVirtualURL } from '../../../Slice/CreateEvent/CreateEvent';
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import style from './Category.module.css'
import Map from './Map';
import ButtonGroup from "./ButtonGroup";
import Checkbox from './CheckBox';
    

function Category({input,setInput,errors, showMsg, setShowMsg,selectedModality, setSelectedModality}){
  const dispatch = useDispatch();//                      STATE GLOBAL.REDUCER.PROPIEDADREDUCER
  const { categories, loading, error } = useSelector(state => state.categories.categories);
    
  const [filteredCategories, setFilteredCategories] = useState([]);
  const selectRef = useRef()
  
    useEffect(() => {
      dispatch(axiosModeCategories());
    }, [dispatch]);
  
    useEffect(() => {
      if (!loading && categories) {
        setFilteredCategories(categories.filter(c => c.modality === selectedModality));
      }
    }, [categories, loading, selectedModality]);

    const handleChanges = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
    };

    const handleGroup = (e) => {
      setSelectedModality(e.target.name);
      selectRef.current.value = ''
      setInput({
        ...input,
        category: null,
        modality: typeof e.target.name === 'string' ? e.target.name : ''
      })
    };

    const handleBlur = (e) =>{
      setShowMsg({
          ...showMsg,
          [e.target.name]: true,
      })
    }

    return(
        <div className={style.info}>
            <p className={style.text}>Select the modality and category of your event.</p>
            <div>
              <ButtonGroup
                input={input}
                buttons={["Presential", "Virtual"]}
                handleGroup={handleGroup}
              />
            </div>
            <div>
              {filteredCategories.length > 0 && (
              <div>
              Category:
              <select ref={selectRef} name="category" className={style.select} value={input.category} onChange={handleChanges}>
               <option value="" selected disabled hidden>Choose here</option>
                {filteredCategories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
              ))}
              </select>
              </div>
              )}
              {selectedModality  && (
              <div>
              <div>
                {selectedModality === "Presential"
               ? <>
                <p className={style.text}>Help locate your event and make sure attendees know where to go.</p>
                <Map input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg} />
                <p className={style.text}>Select the facilities the place has.</p>
                <Checkbox input={input} setInput={setInput}/>
                </>
                : <div>
                  <p>Add the Link to the virtual event.This is only going to be for your guests and sended the day of the event</p>
                  <input
                  className={style.inputs}
                  type="text"
                  placeholder='URL'
                  name='virtualURL'
                  onChange={handleChanges}
                  onBlur={handleBlur} style={ showMsg.virtualURL && errors.virtualURL ? {border:'red 1px solid'}: {}}/>
                 {showMsg.virtualURL&&(
                            <p className={style.warning}>{errors.virtualURL}</p>
                        )}
                </div>
                }
                {/* {errorMsg===false ?
                  <p className={style.warning}>Address is required</p> : undefined
              } */}
              </div>
            </div>
          )}
        </div>
      </div>
  )
};

export default Category;