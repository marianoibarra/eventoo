import Styles from "./Notifications.module.css";
import React, { useState, useRef, useEffect } from "react";
import { BiBell } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const notificationsRef = useRef();
  const {
    data: { buys, sells },
  } = useSelector((state) => state.eventsManagement);
  const handleClick = () => {
    setIsOpen(!isOpen);
    setShowDot(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    setNotifications([
      ...buys,
      ...sells
    ].sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    }).map(notificationsMsg))
  }, [buys, sells]);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  const handleClickOutside = (e) => {
    if (
      notificationsRef.current &&
      !notificationsRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  const notificationsMsg = (transaction) => {
    const msgs = {
      BUY: {
        PENDING: `Your reservation for ${transaction.event.name} is pending, load your transfer voucher`,
        EXPIRED: `Your reservation for ${transaction.event.name} expired for not having loaded the proof of payment`,
        INWAITTING: `Your transfer for the ${transaction.event.name} reserve is being evaluated by the organizer`,
        APPROVED: `Your transfer for ${transaction.event.name} was approved, your tickets were sent by email`,
        DENIED: `Your transfer for ${transaction.event.name} was rejected`,
        CANCELED: `You canceled your reservation to ${transaction.event.name}`,
      },
      SELL: {
        PENDING: `You have a new reservation, ${transaction.buyer ? transaction.buyer.name + ' ' + transaction.buyer.last_name : ''} has 30 minutes to transfer the entry value for ${transaction.event.name}`,
        EXPIRED: `${transaction.buyer ? transaction.buyer.name + ' ' + transaction.buyer.last_name : ''}  does not charge the voucher after 30 minutes, the reserve for ${transaction.event.name} expired`,
        INWAITTING: `${transaction.buyer ? transaction.buyer.name + ' ' + transaction.buyer.last_name : ''}  already charge the proof of payment for ${transaction.event.name}, await your approval`,
        CANCELED: `${transaction.buyer ? transaction.buyer.name + ' ' + transaction.buyer.last_name : ''} canceled the reserve for ${transaction.event.name}`,
      },
    };
    return {
      image: '',
      msg: msgs[transaction.type][transaction.status],
      datetime: transaction.updatedAt
    }
  }

  const NotificationRow = ({data}) => {
    return (
      <Link to={'/user-event'} className={Styles.notificationRow}>
        <div className={Styles.imgWrapper}>
          <img src={data.image} alt="" />
        </div>
        <div className={Styles.msgWrapper}>
          <div className={Styles.text}>{data.msg}</div>
          <div className={Styles.date}>{moment(data.datetime).calendar()}</div>
        </div>
      </Link>
    )
  }
 

  return (
    <div ref={notificationsRef} className={Styles.notificationsContainer}>
      <div className={Styles.iconWrapper} onClick={handleClick}>
        <BiBell size={24} color="#fffd" />
        {showDot && <div className={Styles.dot} />}
      </div>
      <div
        className={
          isOpen ? Styles.notificationsOpen : Styles.notificationsClose
        }
      >
        <div className={Styles.head}>Notifications</div>
        <div className={Styles.main}>{
          notifications.map(n => 
              <NotificationRow data={n}/>
            )
        }</div>
      </div>
    </div>
  );
};
export default Notifications;
