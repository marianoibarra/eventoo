import React, {useState} from 'react';
import style from './Category.module.css'
import Map from './Map';

const categoriesPresencial = [
    "Concert",
    "Food",
    "Exhibitions",
    "Sports",
    "Music",
    "Movies",
  ];
  
  const categoriesOnline = [
    "Webinar",
    "Online course",
    "Streaming",
    "Talks",
    "Art Samples",
  ];
  
//   const EventTypeSelect = () => {
    

function Category(){

    const [selectedType, setSelectedType] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
  
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

    // const handleCategoryChange = (event) => {
    //   setSelectedCategory(event.target.value);
    // };

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
            <div>
             Category:
              <select>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            )}
            {selectedCategory !== "" && (
            <div>
              <div>
                {categories.find((category) => category.value === selectedCategory)
                .placeholder}:
                 <input type="text" />
              </div>
            </div>
            )}
             {selectedType !== "" && (
           <div>
              <div>
                {selectedType === "Presencial"
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