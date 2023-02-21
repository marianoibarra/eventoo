import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SessionContext } from "../..";
import { createEvent } from "../../Slice/CreateEvent/CreateEvent";
import ModalMP from "../Modal/ModalMP/ModalMP";
import style from "./CheckoutCard.module.css";

function CheckOut({ errors, isLogged, input }) {
  const dispatch = useDispatch();

  const { setShowSessionModal } = useContext(SessionContext);

  const handleclick = (e) => {
    e.preventDefault();
    if (isLogged) {
      dispatch(createEvent(input));
    } else {
      alert("Please Log in");
      setShowSessionModal("login");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.details}>
          <div className={style.typeof}>
            <h3>Selected publicity</h3>
            <p>{input.items !== null ? input.items[0].title : 'Free'}</p>
            <h3>Price</h3>
            <p>{input.items !== null ? `$${input.items[0].unit_price}` : '0'}</p>
          </div>
          <div className={style.containerButton}>
            <button
              onClick={handleclick}
              className='btnprimario'
              disabled={Object.keys(errors).length !== 0}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
