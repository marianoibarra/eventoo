import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./BuyButton.module.css";
import ModalTransaction from '../../Modal/ModalTransaction/ModalTransaction'



const BuyButton = () => {

  const [showModal, setShowModal] = useState(false)
  const { isPaid, price } = useSelector(state => state.eventDetail.eventDetail);
  const [tickets, setTickets] = useState(1);
  const totalPrice = (price?.toFixed(2) * tickets).toFixed(2);
  
  function handleButtonSubtraction() {
    setTickets(tickets - 1);
  }

  function handleButtonAddition() {
    setTickets(tickets + 1);
  }

  function handleOnClick(event) {
    event.preventDefault();
  }

  return (
    
    <div className={style.containerbottomright}>
      {showModal && <ModalTransaction setShowModal={setShowModal} quantity={tickets}/> }
     
      {isPaid === true ? 
        <div className={style.buycontainer}>
          <div className={style.container_text_and_tickets}>
              <div className={style.divtext}>
                  <p>
                      <b>Advance Tickets</b>
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
          <button className={`btnprimario ${style.buybutton}`} href="" onClick={()=>setShowModal(!showModal)}>{`Buy by $${totalPrice}`}</button>         
        </div>
          </div>
        </div> 
        : 
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
            <button className={`btnprimario ${style.buybutton}`} href="" onClick={()=>setShowModal(!showModal)}>Book a place</button>  
          </div>
        </div>      
      }
    </div>
  );
};

export default BuyButton;
