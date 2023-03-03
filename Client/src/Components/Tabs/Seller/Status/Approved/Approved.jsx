import React from 'react'
import styles  from './Approved.module.css'
import { TiTick } from "react-icons/ti";

const Approved = ({transaction}) => {
  return (
    <div className={styles.container}>
    <div className={styles.iconContainer}>
      <TiTick className={styles.icon} />
    </div>
    <div className={styles.messageContainer}>
      <h1 className={styles.heading}>Transaction Approved</h1>
      <p className={styles.message}>
      Transfer for <span>{transaction.event.name}</span> was approved.
      </p>
    </div>
  </div>
  )
}

export default Approved



