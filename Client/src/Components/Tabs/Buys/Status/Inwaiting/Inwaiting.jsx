import React from 'react';
import { FaHandPaper } from 'react-icons/fa';
import styles from './Inwaiting.module.css';

function Inwaiting({transaction} ) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FaHandPaper className={styles.icon} />
      </div>
      <div className={styles.messageContainer}>
        <h1 className={styles.heading}>Transaction In Waiting</h1>
        <p className={styles.message}>
          The transaction <p>{transaction?.id?.slice(0, 8)}</p> is currently pending confirmation from the event seller.
        </p>
      </div>
    </div>
  );
}

export default Inwaiting;