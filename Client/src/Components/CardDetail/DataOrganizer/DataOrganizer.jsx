import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import styles from "./DataOrganizer.module.css";

function DataOrganizer({ id, organizador }) {
  const [copiado, setCopiado] = useState(false);

  function copiarTexto(texto) {
    navigator.clipboard
      .writeText(texto)
      .then(() => setCopiado(true))
      .catch(() => setCopiado(false));
  }

  return (
    <div className={styles.miniRecuadro}>
      <div className={styles.title}>
        <p>Event organizer ID  </p>
        <FaCopy className={styles.icono} onClick={() => copiarTexto(id)} />
      </div>
      <div className={styles.title}>
        <p>Name of event organizer</p>
        <FaCopy
          className={styles.icono}
          onClick={() => copiarTexto(organizador)}
        />
      </div>
        {copiado && <p className={styles.confirmacion}>Copied to clipboard</p>}
    </div>
  );
}

export default DataOrganizer;
