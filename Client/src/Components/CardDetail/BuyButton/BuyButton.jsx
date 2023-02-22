import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./BuyButton.module.css";
import ModalTransaction from '../../Modal/ModalTransaction/ModalTransaction'
import { useContext } from "react";
import { SessionContext } from "../../..";
import ModalVoucher from "../../Modal/ModalVoucher/ModalVoucher"


const BuyButton = () => {

  const [showModal, setShowModal] = useState(false)
  const [showModalVoucher, setShowModalVoucher] = useState(false)
  const { events } = useSelector(state => state.eventsBuysSlice);
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

  return (
    
    <div className={style.containerbottomright}>
      {showModal && <ModalTransaction setShowModal={setShowModal} quantity={tickets}/> }
      {showModalVoucher && <ModalVoucher setShowModal={setShowModalVoucher} /> }
      {!events.find(element => element.status === 'PENDING' || element.status === 'INWAITING') && isPaid === true &&
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
          <button className={`btnprimario ${style.buybutton}`} href="" onClick={handleBuy}>{`Buy by $${totalPrice}`}</button>         
        </div>
          </div>
        </div>
      }

      {!events.find(element => element.status === 'PENDING' || element.status === 'INWAITING') && isPaid === false &&
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

      {events.length > 0 && events.find(element => element.status === 'PENDING') ? 
        <div className={style.container_buyer_pending} onClick={() => setShowModalVoucher(true)}>
          <div className={style.buyer_pending}>
              <p>
                You have a pending purchase, click here to load the receipt or cancel the reservation.
              </p>
          </div>
        </div>
        : null
      }
      {console.log(events)}

    {events.length > 0 && events.find(element => element.status === 'INWAITING') ? 
        <div className={style.container_buyer_pending} >
          {console.log('entre')}
          <div className={style.buyer_pending}>
              <p>
                Inwaitting
              </p>
          </div>
        </div>
        : null
    }
    </div>
  );
};

export default BuyButton;