import Styles from "./Menu.module.css";
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import User from "../../../Assets/UserProfile.png";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../Slice/User/UserSlice";
import { SessionContext } from "../../..";

const Menu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { name, last_name, email, image, isLogged } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { setShowSessionModal } = useContext(SessionContext);

  const handleClearLocalStorage = () => {
    dispatch(logOut());
    navigate("/home");
    setIsOpen(false);
  };

  const handleClick = () => {
    if (isLogged) {
      setIsOpen(!isOpen);
    } else {
      setShowSessionModal("login");
    }
  };

  return (
    <div className={Styles.menuContainer}>
      <button className={Styles.menuIcon} onClick={handleClick}>
       {image ? <img
              src={image ? image : User}
              alt="user photo"
              className={Styles.menuIcon}
              onClick={() => setIsOpen(!isOpen)}
            /> : <FaUserCircle size={40} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={Styles.menu}
            initial={{ height: 0 }}
            animate={{ height: 130, width: 130 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={image ? image : User}
              alt="user photo"
              className={Styles.menuPhoto}
              onClick={() => setIsOpen(!isOpen)}
            />

            {name ? (
              <div className={Styles.menuName}>{`${name} ${last_name}`}</div>
            ) : undefined}
            {email ? (
              <>
                <p className={Styles.menuEmail}>{email}</p>

                <Link to="/Setting" className={Styles.menuLink}>
                  Settings
                </Link>
              </>
            ) : undefined}
            {name ? (
              <button
                className={Styles.menuLink}
                onClick={handleClearLocalStorage}
              >
                Log Out
              </button>
            ) : (
              <Link to="/login" className={Styles.menuLink}>
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
