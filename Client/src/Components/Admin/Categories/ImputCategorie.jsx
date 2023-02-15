import React from "react";
import Styles from "./Category.module.css";

const ImputCategorie = ({
  categories,
  name,
  modality,
  image,
  handleInputChange,
  handleClick,
  showDetails,
  setShowDetails,
  setName,
setModality,
setImage,
}) => (
  <>
    {Array.isArray(categories) &&
      categories.map((categorie) => (
        <div className={Styles.eventCard} key={categorie?.id}>
          <h3
            className={Styles.eventCardTitle}
            onClick={() => setShowDetails(categorie.id)}
          >{categorie?.name}
          </h3>
          {showDetails === categorie.id ? (
            <>
              <input name="name" value={name} onChange={handleInputChange} />
              <p>modality: {categorie?.modality}</p>
              <input
                name="modality"
                value={modality}
                onChange={handleInputChange}
              />
              {/* <input name="state" value={image} onChange={handleInputChange} /> */}
              <button onClick={() => handleClick(categorie)}>
                SAVE CHANGES
              </button>
            </>
          ) : undefined}

          <img
            src={categorie?.image}
            style={{ maxWidth: "max-content", maxHeight: "100px" }}
          />
          {showDetails !== categorie.id ?
            <button onClick={() =>{ 
                setShowDetails(categorie.id)
                setName('')
            setModality('')
            setImage('')}}>
              Change data
            </button> : undefined
          }
          
        </div>
      ))}
  </>
);

export default ImputCategorie;
