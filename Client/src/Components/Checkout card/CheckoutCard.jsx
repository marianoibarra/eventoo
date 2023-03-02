import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionContext } from "../..";
import { createEvent } from "../../Slice/CreateEvent/CreateEvent";
import style from "./CheckoutCard.module.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Spinner } from "../Modal/Spinner/Spinner";

function CheckOut({ errors, isLogged, input,setConfirm, confirm}) {
  const dispatch = useDispatch();
  const { loading, preference_id } = useSelector((state) => state.event);

  const { setShowSessionModal } = useContext(SessionContext);

  const handleclick = (e) => {
    e.preventDefault();
    if (isLogged) {
      setConfirm(false);
      localStorage.removeItem("formEvent");
      localStorage.removeItem("lastTime");
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
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
              }}
            >
              <ListItem>
                <ListItemText
                primary={input.items !== null ? input.items[0].title : 'Free Pack'}
                secondary="Selected publicity" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                primary={input.items !== null ? `$${input.items[0].unit_price}` : '0'}
                secondary="Price" />
              </ListItem>
            </List>
          </div>
          <div className={style.containerButton}>
            <button
              onClick={handleclick}
              className='btnprimario'
              disabled={loading || preference_id || Object.keys(errors).length !== 0}
            >
              {loading ? <Spinner/> : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
