import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import styles from './Pending.module.css';

function Pending({transaction}) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FaTimesCircle className={styles.icon} />
      </div>
      <div className={styles.messageContainer}>
        <h1 className={styles.heading}>Transaction Pending</h1>
        <p className={styles.message}>
          Transaction <span>{transaction.event.name}</span> awaiting upload proof.
        </p>
      </div>
    </div>
  );
}

export default Pending;