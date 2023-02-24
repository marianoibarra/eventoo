import style from './Lateral.module.css'
import { Link } from "react-router-dom";

function Lateral() {
    return (
      <div className={style.container}>
      <Link to="/">
            {" "}
            <div className={style.button}>Back</div>
          </Link>
      </div>
  );
}

export default Lateral;