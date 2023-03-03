import React from "react";
import styles from "./Approved.module.css";
import { TiTick } from "react-icons/ti";

function Approved({ transaction }) {
  return (
    <div className={styles.container}>
    <div className={styles.iconContainer}>
      <TiTick className={styles.icon} />
    </div>
    <div className={styles.messageContainer}>
      <h1 className={styles.heading}>Transaction Rejected</h1>
      <p className={styles.message}>
      Your transfer for <span>{transaction.event.name}</span> was approved, your tickets were sent by email.
      </p>
    </div>
  </div>
  );
}

export default Approved;


