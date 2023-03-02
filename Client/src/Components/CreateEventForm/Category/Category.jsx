import React, {useState , useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setMesaggeError, updateCategory, updateVirtualURL } from '../../../Slice/CreateEvent/CreateEvent';
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import style from './Category.module.css'
import Map from './Map';
import ButtonGroup from "./ButtonGroup";
import CheckboxFacilities from './CheckBox';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import GoogleMaps from '../../Modal/ModalSession/MapRegister';
    

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
        setFilteredCategories(categories.filter(c => c.modality === input.modality));
      }
    }, [categories, loading, input.modality]);

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
              <TextField
                    select
                    ref={selectRef}
                    label="Category"
                    name='category'
                    value={input.category}
                    variant="standard"
                    onChange={handleChanges}
                    onBlur={handleBlur}
                    margin="dense"
                    sx={{m: 2, width: '25ch', WebkitTextFillColor: 'var(--dark-text)' }}
                    helperText={showMsg.category ? errors.category : ""}
                    error={showMsg.category && errors.category}
                    style={{ marginBottom: showMsg.category && errors.category ? '0px' : '20px' }}
                >
                    {filteredCategories.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
              </div>
              )}
              {selectedModality  && (
              <div>
              <div>
                {input.modality === "Presential"
               ? <>
                <p className={style.text}>Help locate your event and make sure attendees know where to go.</p>
                <GoogleMaps input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg} />
                <p className={style.text}>Select the facilities the place has.</p>
                <CheckboxFacilities input={input} setInput={setInput}/>
                </>
                : <div>
                  <p className={style.text}>Add the Link to the virtual event.This is only going to be for your guests and sended the day of the event</p>
                  <input
                  className={style.inputs}
                  type="text"
                  placeholder='URL'
                  name='virtualURL'
                  value={input.virtualURL}
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