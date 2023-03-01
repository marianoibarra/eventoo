import React from 'react';
import { FaHandPaper } from 'react-icons/fa';
import styles from './Inwaiting.module.css';
import Voucher from './Voucher/Voucher';

function Inwaiting({ transaction }) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FaHandPaper className={styles.icon} />
      </div>
      <div className={styles.messageContainer}>
        <h1 className={styles.heading}>Transaction In Waiting</h1>
        <Voucher
          transaction={transaction} />
      </div>
    </div>
  );
}

export default Inwaiting;