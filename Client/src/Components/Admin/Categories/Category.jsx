import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateEvent } from "../../../Slice/Admin/AdminSlice";
import { axiosModeEventsBuys } from "../../../Slice/EventsBuysForUser/BuysSlice";
import Styles from "../Users/Create.module.css";

function Buys() {
  const categories = useSelector((state) => state.categories);

  const [name, setName] = useState("");
const [modality, setModality] = useState("");
const [image, setImage] = useState("");

const dispatch = useDispatch();
useEffect(() => {
  dispatch(axiosModeEventsBuys());
}, [dispatch]);

const handleInputChange = (e) => {
  switch (e.target.name) {
    case "name":
      setName(e.target.value);
      break;
    case "modality":
      setModality(e.target.value);
      break;
    case "state":
      setImage(e.target.value);
      break;
    default:
      break;
  }
};

const handleClick = (e) => {
  if(name.length===0){
    setName(e.name)
  }
  if(modality.length===0){
    setModality(e.name)
  }
  if(image.length===0){
    setImage(e.name)
  }
  dispatch(activateEvent(e.id, { name, modality, image }));
};

return (
  <div className={Styles.container}>
    {categories.length > 0
      ? categories.map((categorie) => {
        (
          <div className={Styles.eventCard} key={categorie.name}>
            <h3 className={Styles.eventCardTitle}>
              Nombre: {categorie.name}
            </h3>
            <input
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <p>modality: {categorie.modality}</p>
            <input
              name="modality"
              value={modality}
              onChange={handleInputChange}
            />
            <p>State: {categorie.image}</p>
            <input
              name="state"
              value={image}
              onChange={handleInputChange}
            />
            <button onClick={() => handleClick(categorie)}></button>
          </div>
        )})
      : u1ndefined}
  </div>
  );
}

export default Buys;
