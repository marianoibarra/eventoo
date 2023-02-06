import { Link, useNavigate } from "react-router-dom";
import Menu from "./menu/Menu";
import { FaLanguage } from "react-icons/fa";
import Estilo from "./NavBar.module.css";

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <header className={Estilo.ContenedorHeader}>
      <nav className={Estilo.ContenedorNavbar}>
        <Link to="/">
          {" "}
          <span className={Estilo.Titulo}>
            EVEN<b>TOO</b>
          </span>
        </Link>
        <div className={Estilo.MenuItem}>
      
            <button className={Estilo.MenuItem} onClick={()=>navigate("/create-event")}>Create Event</button>
         
        </div>
      </nav>
      <Menu />
    </header>
  );
};

export default Navbar;