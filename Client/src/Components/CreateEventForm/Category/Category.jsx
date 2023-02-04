import React, {useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import style from './Category.module.css'
import Map from './Map';
    

function Category(){
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

    return(
        <div className={style.info}>
            <h2 className={style.title}>Choose a category and access</h2>
            <p className={style.text}>It is important to select a category, as this will help in the classification and organization of your event.</p>
            <select  onChange={handleChange}>
                <option value="">Select a kind of access</option>
                <option value="Presential">Presential</option>
                <option value="Virtual">Virtual</option>
            </select>
            <div>
            {filteredCategories.length > 0 && (
            <div>
             Category:
              <select>
                {filteredCategories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            )}
             {selectedModality !== "" && (
           <div>
              <div>
                {selectedModality === "Presential"
               ? <Map/>
                : "URL:"}
                <input type="text" />
              </div>
             </div>
            )}
          </div>
        </div>
    )
};

export default Category;