import React, {useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setMesaggeError, updateCategory, updateVirtualURL } from '../../../Slice/CreateEvent/CreateEvent';
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import style from './Category.module.css'
import Map from './Map';
    

function Category({input,setInput,errors, showMsg, setShowMsg}){
  const dispatch = useDispatch();//                      STATE GLOBAL.REDUCER.PROPIEDADREDUCER
  const { categories, loading, error } = useSelector(state => state.categories.categories);
  //const {errorMsg} = useSelector(state => state.event);
  const [selectedModality, setSelectedModality] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [category, setCategory] = useState('');
  
    useEffect(() => {
      dispatch(axiosModeCategories());
    }, [dispatch]);
  
    useEffect(() => {
      if (!loading && categories) {
        setFilteredCategories(categories.filter(c => c.modality === selectedModality));
      }
    }, [categories, loading, selectedModality]);
    
    // const handleChange = e => {
    //   e.preventDefault();
    //   setSelectedModality(e.target.value);
    // };

    const handleCategory = e => {
      e.preventDefault();
      setCategory(e.target.value);
      dispatch(updateCategory(e.target.value));
      setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    }; 

    const handleUrl = e =>{
      e.preventDefault();
      dispatch(updateVirtualURL(e.target.value));
      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
      console.log(input)
    }

    const handleBlur = (e) =>{
      setShowMsg({
          ...showMsg,
          [e.target.name]: true,
      })
    }

    function handleSelect(e){
      e.preventDefault();
      setSelectedModality(e.target.value);
      // if(e.target.value==='Virtual'){
      //   dispatch(setMesaggeError(true));
        
      // }
      // if(e.target.value==='Presential'){
      //   dispatch(setMesaggeError(false));
        
      // }
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })
  };

    return(
        <div className={style.info}>
            <h2 className={style.title}>Choose a category and access</h2>
            <p className={style.text}>It is important to select a category, as this will help in the classification and organization of your event.</p>
            <div>
              Access:
              <select name ='category' className={style.select} onChange={e=>handleSelect(e)} onBlur={handleBlur} style={ showMsg.category && errors.category ? {border:'red 1px solid'}: {}} >
                <option className={style.select} value="">Select a kind of access</option>
                <option className={style.select}  name='modality' value='Presential' >Presential</option>
                <option className={style.select}  name='modality' value='Virtual'>Virtual</option>
              </select>
              {showMsg.category&&(
                            <p className={style.warning}>{errors.category}</p>
                        )}
            </div>
            <div>
            {filteredCategories.length > 0 && (
            <div>
             Category:
              <select className={style.select} onChange={e=>handleCategory(e)} >
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
               ? <Map />
                : <div>
                  <input className={style.inputs} type="text" placeholder='URL' name='virtualURL' onChange={handleUrl}
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