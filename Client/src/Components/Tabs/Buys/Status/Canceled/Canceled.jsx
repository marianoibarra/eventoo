import React from "react";
import styles from "./Canceled.module.css";
import { TiCancel } from "react-icons/ti";

function Canceled({ transaction }) {
  return (
    <>
      <div className={styles.transaction}>
        <TiCancel
          className={styles.icon}
           />
      <h1 className={styles.heading}>Transaction Cancelled</h1>
      </div>
      <p className={styles.message}>You canceled your reservation to<p>{transaction.event.name}</p>by transaction<p> {transaction?.id?.slice(0, 8)}</p></p>
    </>
  );
}

export default Canceled;
