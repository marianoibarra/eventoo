import { Link, useNavigate } from "react-router-dom";
import Menu from "./menu/Menu";
import { FaLanguage } from "react-icons/fa";
import Styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [scrollHeight, setScrollHeight] = useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollHeight(position)
  }
  const { isLogged } = useSelector((state) => state.user);
  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);
  }, [scrollHeight])


  return (
    <header className={Styles.ContenedorHeader}>
      <nav className={`${Styles.ContenedorNavbar} ${Styles.navbar} ${scrollHeight > 1 ? Styles.scrolling : null}`}>
        <div className={Styles.left}>
          <Link to="/">
            {" "}
            <span className={Styles.Titulo}>
              Even<span className={Styles.bold}>too</span>
            </span>
          </Link>
          <div className={Styles.location}>
            <HiOutlineLocationMarker color="#fffa" size={20}/>
            Buenos Aires
            <BiChevronDown color="#fffa" size={18}/>
          </div>
        </div>

        <div className={Styles.searchbarOpen}>
          <SearchBar />
        </div>
        <div className={Styles.MenuItems}>
            <Link className={Styles.MenuLink} to={"/create-event"}>Create Event</Link>
            <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;