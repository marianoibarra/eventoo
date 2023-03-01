import React from "react";
import styles from "./Approved.module.css";
import { TiCancel } from "react-icons/ti";

function Approved({ transaction }) {
  return (
    <>
      <div className={styles.transaction}>
        <TiCancel
          className={styles.icon}
           />
      <h1 className={styles.heading}>Transaction Cancelled</h1>
      </div>
      <p className={styles.message}>Your transfer for<p>{transaction.event.name}</p>was approved, your tickets were sent by email</p>
    </>
  );
}

export default Approved;
