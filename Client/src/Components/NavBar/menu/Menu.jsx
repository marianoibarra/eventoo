import Styles from "./Menu.module.css";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import User from "../../../Assets/UserExample.jpg";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={Styles.menuContainer}>
      <button className={Styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
        <FaUserCircle size={40}/>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={Styles.menu}
            initial={{ height: 0 }}
            animate={{ height: 130 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={User} alt="user photo" className={Styles.menuPhoto} onClick={() => setIsOpen(!isOpen)}/>

            <div className={Styles.menuName}>primer usuario</div>
            <p className={Styles.menuEmail}>fede.cid.96@gmail.com</p>

            <Link to="/Setting" className={Styles.menuLink}>
              Settings
              </Link>
              <button onClick={undefined} className={Styles.menuLink}>
              Log Out
              </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
