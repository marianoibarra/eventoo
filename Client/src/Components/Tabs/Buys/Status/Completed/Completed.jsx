import React from "react";
import styles from "./Completed.module.css";
import { AiFillHeart } from "react-icons/ai";

function Completed({transaction} ) {
  return (
    <>
      <div className={styles.transaction}>
        <AiFillHeart className={styles.icon} color='white' />
      </div>
      <h1 className={styles.heading}>Transaction Successful</h1>
      <p className={styles.message}>
        Your transaction <p>{transaction?.id?.slice(0, 8)}</p> has been completed successfully.
      </p>
    </>
  );
}

export default Completed;
