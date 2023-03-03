import React from "react";
import styles from "./Canceled.module.css";
import { TiCancel } from "react-icons/ti";

function Canceled({ transaction }) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <TiCancel className={styles.icon} />
      </div>
      <div className={styles.messageContainer}>
        <h1 className={styles.heading}>Transaction Canceled</h1>
        <p className={styles.message}>
        You canceled your reservation to <span>{transaction.event.name}</span>
        </p>
      </div>
    </div>
  );
}

export default Canceled;
