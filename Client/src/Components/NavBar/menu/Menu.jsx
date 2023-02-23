import Styles from "./Menu.module.css";
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import User from "../../../Assets/UserProfile.png";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../Slice/User/UserSlice";
import { SessionContext } from "../../..";
import { clearFavorites } from "../../../Slice/Favorites/FavoritesSlice";
import { clearTransactions } from "../../../Slice/transaction/TransactionSlice";
import { clearEventsManagement } from "../../../Slice/eventsManagement/eventsManagementSlice";

const Menu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { name, last_name, email, profile_pic, isLogged , roleAdmin} = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { setShowSessionModal } = useContext(SessionContext);

  const handleClearLocalStorage = () => {
    dispatch(logOut());
    dispatch(clearFavorites())
    dispatch(clearTransactions())
    dispatch(clearEventsManagement())
    navigate("/");
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
    <div className={Styles.menuContainer} >
      <div className={Styles.menuIcon} onClick={handleClick} >
       {profile_pic ? <img
              src={profile_pic ? profile_pic : User}
              alt="user photo"
              className={Styles.menuIcon}
              onClick={() => setIsOpen(!isOpen)}
            /> : <FaUserCircle color="#fff9" size={34} />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={Styles.menu}
            initial={{ height: 0 }}
            animate={{ height: 160, width: 130 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={profile_pic ? profile_pic : User}
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

                <Link to="/user-event" className={Styles.menuLink}>
                  My events
                </Link>
                <Link to="/Setting" className={Styles.menuLink}>
                  Settings
                </Link>
              </>
            ) : undefined}
            {roleAdmin && roleAdmin !== "USER" ? (
              <>
                <Link to="/admin" className={Styles.menuLink}>
                  Dashboard
                </Link>
              </>
            ) : undefined}
            {isLogged ? (
            <>
              <button
              className={Styles.menuLink}
              onClick={handleClearLocalStorage}
            >
              Log Out
            </button>
            </>
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
