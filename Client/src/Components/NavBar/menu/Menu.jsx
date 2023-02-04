import Styles from "./Menu.module.css";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import User from "../../../Assets/UserProfile.png";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, last_name, email, image } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
  };

  return (
    <div className={Styles.menuContainer}>
      <button className={Styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
        <FaUserCircle size={40} />
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
            <img
              src={image? image : User}
              alt="user photo"
              className={Styles.menuPhoto}
              onClick={() => setIsOpen(!isOpen)}
            />

           {name? <div className={Styles.menuName}>{`${name} ${last_name}`}</div> : undefined}
            {email? <p className={Styles.menuEmail}>{email}</p> : undefined}

            <Link to="/Setting" className={Styles.menuLink}>
              Settings
            </Link>
            <button  onClick={()=>handleSubmit()} className={Styles.menuLink}>
              Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
