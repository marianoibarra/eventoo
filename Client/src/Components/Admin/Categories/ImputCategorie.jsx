import React from "react";
import styles from "./InputCategory.module.css";

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
    <div className={styles.eventCard} key={categorie?.id}>
      <h3
        className={styles.eventCardTitle}
        onClick={() => setShowDetails(categorie.id)}
      >
        {categorie?.name}
      </h3>
      {showDetails === categorie.id ? (
        <>
          <input className={styles.input} name="state" value={image} onChange={handleInputChange} />
          
          <button onClick={() => handleClick(categorie)} className={styles.changeDataButton}>
            SAVE CHANGES
          </button>
        </>
      ) : undefined}

      <img
        src={categorie?.image}
        className={styles.eventImage}
        style={{ maxWidth: "max-content", maxHeight: "100px" }}
        
      />
      {showDetails !== categorie.id ? (
        <button
          className={styles.changeDataButton}
          onClick={() => {
            setShowDetails(categorie.id);
            setImage("");
          }}
        >
          Change data
        </button>
      ) : undefined}
    </div>
  ))}
  </>
);

export default ImputCategorie;
