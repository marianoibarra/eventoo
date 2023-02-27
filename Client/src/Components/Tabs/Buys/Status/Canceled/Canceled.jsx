import React from "react";
import styles from "./Canceled.module.css";
import { TiCancelOutline } from "react-icons/ti";

function Canceled({ transaction }) {
  return (
    <>
      <div className={styles.transaction}>
        <TiCancelOutline
          className={styles.icon}
           />
      </div>
      <h1 className={styles.heading}>Transaction Cancelled</h1>
      <p className={styles.message}>Your transaction <p>{transaction?.id?.slice(0, 8)}</p> has been cancelled.</p>
    </>
  );
}

export default Canceled;
