import React, {useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateCategory, updateVirtualURL } from '../../../Slice/CreateEvent/CreateEvent';
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import style from './Category.module.css'
import Map from './Map';
    

function Category(){
  const dispatch = useDispatch();//                      STATE GLOBAL.REDUCER.PROPIEDADREDUCER
  const { categories, loading, error } = useSelector(state => state.categories.categories);
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


    const handleChange = e => {
      e.preventDefault();
      setSelectedModality(e.target.value);
    };

    const handleCategory = e => {
      e.preventDefault();
      setCategory(e.target.value);
      dispatch(updateCategory(e.target.value));
    };

    const handleUrl = e =>{
      e.preventDefault();
      dispatch(updateVirtualURL(e.target.value));
    }

    return(
        <div className={style.info}>
            <h2 className={style.title}>Choose a category and access</h2>
            <p className={style.text}>It is important to select a category, as this will help in the classification and organization of your event.</p>
            <div>
              Access:
              <select className={style.select} onChange={handleChange}>
                <option className={style.select} value="">Select a kind of access</option>
                <option className={style.select}  name='modality' value='Presential'>Presential</option>
                <option className={style.select}  name='modality' value='Virtual'>Virtual</option>
              </select>
            </div>
            <div>
            {filteredCategories.length > 0 && (
            <div>
             Category:
              <select className={style.select} onChange={handleCategory}>
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
               ? <Map/>
                : <input className={style.inputs} type="text" placeholder='URL' onChange={handleUrl}/>}
              </div>
             </div>
            )}
          </div>
        </div>
    )
};

export default Category;