import React from 'react'
import styles from "./Denied.module.css";
import { TiCancel } from "react-icons/ti";

const Denied = ({transaction}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <TiCancel className={styles.icon} />
      </div>
      <div className={styles.messageContainer}>
        <h1 className={styles.heading}>Transaction Denied</h1>
        <p className={styles.message}>
        Your transfer for <span>{transaction.event.name}</span> was rejected
        </p>
      </div>
    </div>
  )
}

export default Denied