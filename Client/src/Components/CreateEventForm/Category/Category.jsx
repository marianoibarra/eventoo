import React, {useState} from 'react';
import style from './Category.module.css'

const categoriesPresencial = [
    "Conferencia",
    "Seminario",
    "Taller",
    "Exposición",
  ];
  
  const categoriesOnline = [
    "Webinar",
    "Curso en línea",
    "Streaming",
  ];
  
//   const EventTypeSelect = () => {
    

function Category(){

    const [selectedType, setSelectedType] = useState("");
    const [categories, setCategories] = useState([]);
  
    const handleTypeChange = (event) => {
      setSelectedType(event.target.value);
      if (event.target.value === "Presencial") {
        setCategories(categoriesPresencial);
      } else if (event.target.value === "Online") {
        setCategories(categoriesOnline);
      } else {
        setCategories([]);
      }
    };

    return(
        <div className={style.info}>
            <h2 className={style.title}>Choose a category and access</h2>
            <p className={style.text}>It is important to select a category, as this will help in the classification and organization of your event.</p>
            <select value={selectedType} onChange={handleTypeChange}>
                <option value="">Select a kind of access</option>
                <option value="Presencial">Onsite</option>
                <option value="Online">Online</option>
            </select>
            <div>
            {categories.length > 0 && (
            <label>
             Category:
             <select>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            </select>
            </label>
             )}
            </div>
           
        </div>
    )
};

export default Category;