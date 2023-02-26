import Styles from "./Notifications.module.css";
import React, { useState } from "react";
import { BiBell } from "react-icons/bi";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDot, setShowDot] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setShowDot(false)
  };

  return (
    <div className={Styles.notificationsContainer} onClick={handleClick}>
      <div className={Styles.iconWrapper}>
        <BiBell size={24} color="#fffd" />
        {showDot && <div className={Styles.dot}/>}
      </div>
      {isOpen && <div className={Styles.menu}></div>}
    </div>
  );
};
export default Notifications;
