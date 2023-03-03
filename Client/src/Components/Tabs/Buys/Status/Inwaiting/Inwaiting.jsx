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
      <h1 className={styles.heading}>Transaction Inwaiting</h1>
      <p className={styles.message}>
      Your transfer for the <span>{transaction.event.name}</span> reserve is being evaluated by the organizer.
      </p>
    </div>
  </div>
  );
}

export default Inwaiting;