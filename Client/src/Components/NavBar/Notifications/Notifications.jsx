import Styles from "./Notifications.module.css";
import React, { useState, useRef, useEffect } from "react";
import { BiBell } from "react-icons/bi";
import { RiZzzLine } from "react-icons/ri";
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
        PENDING: `Your reservation for <span>${transaction.event.name}</span> is pending, load your transfer voucher`,
        EXPIRED: `Your reservation for <span>${transaction.event.name}</span> expired for not having loaded the proof of payment`,
        INWAITING: `Your transfer for the <span>${transaction.event.name}</span> reserve is being evaluated by the organizer`,
        APPROVED: `Your transfer for <span>${transaction.event.name}</span> was approved, your tickets were sent by email`,
        DENIED: `Your transfer for <span>${transaction.event.name}</span> was rejected`,
        CANCELED: `You canceled your reservation to <span>${transaction.event.name}</span>`,
      },
      SELL: {
        PENDING: `You have a new reservation, ${transaction.buyer ? `<span>${transaction.buyer.name + ' ' + transaction.buyer.last_name}</span>` : ''} has 20 minutes to transfer the entry value for <span>${transaction.event.name}</span>`,
        EXPIRED: `${transaction.buyer ? `<span>${transaction.buyer.name + ' ' + transaction.buyer.last_name}</span>` : ''}  does not charge the voucher after 20 minutes, the reserve for <span>${transaction.event.name}</span> expired`,
        INWAITING: `${transaction.buyer ? `<span>${transaction.buyer.name + ' ' + transaction.buyer.last_name}</span>` : ''}  already charge the proof of payment for <span>${transaction.event.name}</span>, await your approval`,
        CANCELED: `${transaction.buyer ? `<span>${transaction.buyer.name + ' ' + transaction.buyer.last_name}</span>` : ''} canceled the reserve for <span>${transaction.event.name}</span>`,
      },
    };
    return {
      image: transaction.type === 'BUY' ? transaction.event.cover_pic ? transaction.event.cover_pic : transaction.event.category.image : transaction.buyer.profile_pic,
      msg: <span dangerouslySetInnerHTML={{ __html: msgs[transaction.type][transaction.status] }} />,
      datetime: transaction.updatedAt,
      type: transaction.type  
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
          <div className={Styles.date}>{moment(data.datetime).calendar() + ' - ' + data.type}</div>
        </div>
      </Link>
    )
  }
 

  return (
    <div ref={notificationsRef} className={Styles.notificationsContainer}>
      
      <div
        className={
          isOpen ? Styles.notificationsOpen : Styles.notificationsClose
        }
      >
        <div className={Styles.head}>Notifications</div>
        <div className={Styles.main}>{
          notifications.length > 0
            ? notifications.map(n => 
                <NotificationRow data={n}/>
              )
            : <div className={Styles.nothing}>
                <RiZzzLine size={80} />
                Nothing yet
              </div>
        }</div>
      </div>
      <div className={Styles.iconWrapper} onClick={handleClick}>
        <BiBell size={24} color="#fffd" />
        {showDot && <div className={Styles.dot} />}
      </div>
    </div>
  );
};
export default Notifications;
