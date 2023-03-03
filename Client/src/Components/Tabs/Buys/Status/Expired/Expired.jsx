import React from 'react';
import { BiTimeFive } from 'react-icons/bi';
import styles from './Expired.module.css';

function Expired({transaction}) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <BiTimeFive className={styles.icon} />
      </div>
      <div className={styles.messageContainer}>
        <h1 className={styles.heading}>Transaction Expired</h1>
        <p className={styles.message}>
        Your reservation for <span>{transaction.event.name}</span> expired for not having loaded the proof of payment.
        </p>
      </div>
    </div>
  );
}

export default Expired;