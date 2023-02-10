import { Link, useNavigate } from "react-router-dom";
import Menu from "./menu/Menu";
import { FaLanguage } from "react-icons/fa";
import Styles from "./NavBar.module.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrollHeight, setScrollHeight] = useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollHeight(position)
  }
  
  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);
  }, [scrollHeight])

  const navigate = useNavigate()
  return (
    <header className={Styles.ContenedorHeader}>
      <nav className={`${Styles.ContenedorNavbar} ${Styles.navbar} ${scrollHeight > 1 ? Styles.scrolling : null}`}>
        <Link to="/">
          {" "}
          <span className={Styles.Titulo}>
            EVEN<b>TOO</b>
          </span>
        </Link>
        <div className={Styles.MenuItem}>
      
            <button className={Styles.MenuItem} onClick={()=>navigate("/create-event")}>Create Event</button>
            <button className={Styles.MenuItem} onClick={()=>navigate("/home")}>Events</button>
         
        </div>
      </nav>
      <Menu />
    </header>
  );
};

export default Navbar;