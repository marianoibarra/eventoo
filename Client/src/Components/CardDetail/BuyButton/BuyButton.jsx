import React, { useState } from "react";
import style from "./BuyButton.module.css";

const BuyButton = () => {
  const price = 150;
  const [tickets, setTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);

  return (
    <div className={style.containerbottomright}>
      <div className={style.buycontainer}>
        <div className={style.container_text_and_tickets}>
            <div className={style.divtext}>
                <p>
                    <b>Advance Tickets</b>
                </p>
                <p className={style.price}>{"$" + price}</p>
            </div>
            <div className={style.containertickets}>
                <button><span>−</span></button>
                <span><b>{tickets}</b></span>
                <button><span>+</span></button>
            </div>
        </div>
        <div>
          <a className={`btnprimario ${style.buybutton}`} href="">
            <span>{`Buy by $${totalPrice}`}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuyButton;
