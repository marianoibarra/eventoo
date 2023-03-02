import React from 'react';
import { FaHandPaper } from 'react-icons/fa';
import styles from './Inwaiting.module.css';

function Inwaiting({transaction} ) {
  return (
    <>
    <div className={styles.transaction}>
      <FaHandPaper
        className={styles.icon}
         />
    <h1 className={styles.heading}>Transaction Inwaiting</h1>
    </div>
    <p className={styles.message}>Your transfer for the<p> {transaction.event.name}</p> reserve is being evaluated by the organizer</p>
  </>
  );
}

export default Inwaiting;