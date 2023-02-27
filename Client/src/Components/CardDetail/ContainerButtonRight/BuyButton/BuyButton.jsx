import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./BuyButton.module.css";
import ModalTransaction from '../../../Modal/ModalTransaction/ModalTransaction'
import { useContext } from "react";
import { SessionContext } from "../../../..";
import ModalVoucher from "../../../Modal/ModalVoucher/ModalVoucher"
import SpinnerWhite from "../../../../utils/SpinnerWhite/SpinnerWhite";
import { Alert, AlertTitle } from "@mui/material";
import { SessionContext } from "../../..";

const sxPending = {
  borderRadius: '12px',
  width: '100%',
  margin: '0 auto'
}

const sxAwaitting = {
  borderRadius: '12px',
  width: 'max-content',
  margin: '0 auto'
}

const BuyButton = () => {

  const [showModal, setShowModal] = useState(false)  
  const { data: {buys: eventsBuyed}, loading: {get: loading} } = useSelector(state => state.eventsManagement);
  const user = useSelector(state => state.user);
  const { isPaid, price } = useSelector(state => state.eventDetail.eventDetail);
  const [tickets, setTickets] = useState(1);
  const totalPrice = (price?.toFixed(2) * tickets).toFixed(2);

  const {isLogged} = useSelector(state => state.user)
  
  const { setShowSessionModal } = useContext(SessionContext);

  function handleButtonSubtraction() {
    setTickets(tickets - 1);
  }

  function handleButtonAddition() {
    setTickets(tickets + 1);
  }

  const handleBuy = () => {
    if(isLogged) {
      setShowModal(!showModal)
    } else {
      setShowSessionModal('login')
    }
  }

  if(loading) return <div className={style.containerbottomright}><SpinnerWhite /></div>

  return (
    
    <>
      {showModal && <ModalTransaction setShowModal={setShowModal} quantity={tickets}/> }
      {console.log(eventsBuyed)}
      {isLogged && eventsBuyed.length > 0 ? !eventsBuyed.find(element => element.status === 'PENDING') : true && isPaid === true &&
        <div className={style.buycontainer}>
          <div className={style.container_text_and_tickets}>
              <div className={style.divtext}>
                  <p>
                      <b>Tickets</b>
                  </p>
                  <p className={style.price}>{"$" + price}</p>
              </div>
              <div className={style.containertickets}>
                  <button onClick={handleButtonSubtraction} disabled={tickets === 1 ? true : false}><span>−</span></button>
                  <span><b>{tickets}</b></span>
                  <button onClick={handleButtonAddition} disabled={tickets === 10 ? true : false}><span>+</span></button>
              </div>
          </div>
          <div>
        <div>
          <button className={`btnprimario ${style.buybutton}`} href="" onClick={handleBuy}>{`Buy by $${totalPrice}`}</button>         
        </div>
          </div>
        </div>
      }

      {isLogged && eventsBuyed.length > 0 ? !eventsBuyed.find(element => element.status === 'PENDING') : true && isPaid === false &&
        <div className={style.buycontainer}>
          <div className={style.container_text_and_tickets}>
              <div className={style.divtext}>
                  <p>
                      <b>General Admission</b>
                  </p>
                  <p className={style.price}>Free</p>
              </div>
              <div className={style.containertickets}>
                  <button onClick={handleButtonSubtraction} disabled={tickets === 1 ? true : false}><span>−</span></button>
                  <span><b>{tickets}</b></span>
                  <button onClick={handleButtonAddition} disabled={tickets === 10 ? true : false}><span>+</span></button>
              </div>
          </div>
          <div>
            <button className={`btnprimario ${style.buybutton}`} href="" onClick={handleBuy}>Book a place</button>  
          </div>
        </div>      
      }

      {eventsBuyed.length > 0 && isLogged && eventsBuyed.find(element => element.status === 'PENDING') && 
        <div className={style.container_buyer_pending} >
          <Alert sx={sxPending} severity="warning">
            <AlertTitle>Warning</AlertTitle>
            You have a pending purchase, click here to load the receipt or cancel the reservation.
          </Alert>
        </div>
        
      }

    {eventsBuyed.length > 0 && isLogged && eventsBuyed.find(element => element.status === 'INWAITING') && 
        <div className={style.container_buyer_pending} >
          <Alert sx={sxAwaitting} severity="warning">
            Inwaitting
          </Alert>
        </div>
    }
    </>
  );
};

export default BuyButton;