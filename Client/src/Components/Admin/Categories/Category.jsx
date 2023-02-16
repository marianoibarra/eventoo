import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activateEvent,
  changeStateEvent,
} from "../../../Slice/Admin/AdminSlice";
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import Styles from "./Category.module.css";
import ImputCategorie from "./ImputCategorie";

function Buys() {
  const categories = useSelector((state) => state.categories.categories.categories);
  const [name, setName] = useState("");
  const [modality, setModality] = useState("");
  const [image, setImage] = useState("");
  const [showDetails, setShowDetails] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(axiosModeCategories());

  }, [dispatch,]);

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
    if (name.length === 0) {
      setName(e.name);
    }
    if (modality.length === 0) {
      setModality(e.modality);
    }
    if (image.length === 0) {
      setImage(e.image);
    }

    const event = {id:e.id,
 name:name,
    modality:modality,
    image:image
  
    };
    console.log(e)
    dispatch(changeStateEvent(event));
    setName('')
    setModality('')
    setImage('')
  };

  return (
    <div className={Styles.container}>
 <ImputCategorie
      categories={categories}
      name={name}
      modality={modality}
      image={image}
      handleInputChange={handleInputChange}
      handleClick={handleClick}
      setShowDetails={setShowDetails}
      showDetails={showDetails}
      setName={setName}
setModality={setModality}
setImage={setImage}
/>
    </div>
  );
}

export default Buys;
