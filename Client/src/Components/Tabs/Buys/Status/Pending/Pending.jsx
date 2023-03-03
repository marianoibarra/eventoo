import React from "react";
import styles from "./Pending.module.css";
import Voucher from "./Voucher/Voucher";
import { MdPendingActions } from 'react-icons/md';

const Pending = ({
  transaction
}) => {
  const totalPrice = transaction.event.price * transaction.tickets.length

  return (
    <>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <MdPendingActions className={styles.icon} />
        </div>
        <div className={styles.messageContainer}>
          <h1 className={styles.heading}>Transaction Pending</h1>
          <p className={styles.message}>
            Your reservation for <span>{transaction.event.name}</span> is pending, load your transfer voucher
          </p>
        </div>
      </div>
      <div>
        <Voucher
          transaction={transaction.id}
          eventId={transaction.event.id}
        />
      </div>
    </>
  );
};

export default Pending;
