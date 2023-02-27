import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SessionContext } from "../..";
import { createEvent } from "../../Slice/CreateEvent/CreateEvent";
import style from "./CheckoutCard.module.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

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
