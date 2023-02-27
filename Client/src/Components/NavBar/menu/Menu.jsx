import Styles from "./Menu.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../Slice/User/UserSlice";
import { SessionContext } from "../../..";
import { clearFavorites } from "../../../Slice/Favorites/FavoritesSlice";
import { clearEventsManagement } from "../../../Slice/eventsManagement/eventsManagementSlice";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineSetting, AiOutlineCalendar } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { BiChevronDown } from "react-icons/bi";


const Menu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { name, last_name, email, profile_pic, isLogged, roleAdmin } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { setShowSessionModal } = useContext(SessionContext);
  const menuRef = useRef();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(clearFavorites());
    dispatch(clearEventsManagement());
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={Styles.menuContainer} ref={menuRef}>
      <div onClick={handleClick} className={Styles.userToggle}>
        {isLogged ? (
          <div className={Styles.userLogged}>
            <img src={profile_pic} alt="user photo" />
            <BiChevronDown color="#fffa" size={18} />
          </div>
        ) : (
          <div className={Styles.login}>
            <FaUserCircle size={24} />
            Login
          </div>
        )}
      </div>

      <div className={isOpen ? Styles.menuOpen : Styles.menuClose}>
        <div className={Styles.row}>
          <div className={Styles.icon}>
            <img src={profile_pic} />
          </div>
          <div className={Styles.label}>{`${name} ${last_name}`}</div>
        </div>
        {roleAdmin && roleAdmin !== "USER" && (
          <Link to="/admin" className={Styles.rowC}>
            <div className={Styles.icon}>
              <GrUserAdmin />
            </div>
            <div className={Styles.label}>Dashboard admin</div>
          </Link>
        )}

        <Link to="/user-event" className={Styles.rowC}>
          <div className={Styles.icon}>
            <AiOutlineCalendar />
          </div>
          <div className={Styles.label}>My events</div>
        </Link>
        <Link to="/Setting" className={Styles.rowC}>
          <div className={Styles.icon}>
            <AiOutlineSetting />
          </div>
          <div className={Styles.label}>Settings</div>
        </Link>
        <div className={Styles.divisor}></div>
        <div className={Styles.rowC} onClick={handleLogout}>
          <div className={Styles.icon}>
            <MdOutlineLogout />
          </div>
          <div className={Styles.label}>Log out</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

