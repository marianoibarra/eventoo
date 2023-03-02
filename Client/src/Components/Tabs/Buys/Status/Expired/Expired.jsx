import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import styles from './Expired.module.css';

function Expired({transaction}) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FaTimesCircle className={styles.icon} />
      </div>
      <div className={styles.messageContainer}>
        <h1 className={styles.heading}>Transaction Rejected</h1>
        <p className={styles.message}>
          The transaction <p>{transaction?.id?.slice(0, 8)}</p> has been rejected by the event seller.
        </p>
      </div>
    </div>
  );
}

export default Expired;