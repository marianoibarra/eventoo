import React from 'react';
import { FaHandPaper } from 'react-icons/fa';
import styles from './Inwaiting.module.css';
import Voucher from './Voucher/Voucher';

function Inwaiting({ transaction }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <FaHandPaper className={styles.icon} />
        </div>
        <div className={styles.messageContainer}>
          <h1 className={styles.heading}>Transaction Inwaiting</h1>
          <p className={styles.message}>
            Transfer for <span>{transaction.event.name}</span> awaiting approval.
          </p>
        </div>
      </div>
      <div>
        <Voucher
          transaction={transaction} />
      </div>
    </>
  );
}

export default Inwaiting;