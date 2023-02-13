import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTransaction } from '../../Slice/transaction/TransactionVoucher';
import Style from './ModalVoucher.module.css'

const ModalVoucher = () => {
  const dispatch = useDispatch();

  const ticket = useSelector(state => state.transactionVoucher)
  useEffect(() => {
    const idTransaction = localStorage.getItem("idTransaction");
    if (idTransaction) {
      const object = JSON.parse(idTransaction);
      dispatch(setTransaction(object));
    }
  }, [dispatch]);

  return (
    <div>
      <p>{ticket.eventId}</p>
    </div>
  )
}

export default ModalVoucher