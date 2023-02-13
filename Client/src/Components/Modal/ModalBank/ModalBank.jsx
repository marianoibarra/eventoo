import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from '../Modal'
import { createBankAccount } from '../../../Slice/BankAcount/BankAcount';
import { useDispatch, useSelector } from 'react-redux';
import BankAccountCards from './BankAccountCards';
import style from './ModalBank.module.css'

const ModalBank = ({setShowModal, input, setInput}) => {

  const dispatch = useDispatch();
  const [name,setName] = useState(input.bankAcount);
  const [CBU, setCBU] = useState(input.bankAcount);
  const {bankAccount} = useSelector(state => state.bankAccounts);


  useEffect(() => {
    console.log('effectBank',bankAccount)
  });

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(createBankAccount({ name, CBU }));
  };

  const handleDone = (e) => {
    e.preventDefault();
    setShowModal(false);
};

  return (
    <Modal setShowModal={setShowModal}>
      <div className={style.modal}>
      <h2>Select your bank account</h2>
      <BankAccountCards buttons={bankAccount} input={input} setInput={setInput} />
      <div>
        <h2>Create a new bank account</h2>
        <input type="text" value={input.bankAcount} placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <input type="text" value={input.bankAcount} placeholder='CBU' onChange={(e) => setCBU(e.target.value)} />
        <button type="button" onClick={handleClick}>Create Bank Account</button>
      </div>
      <button type='button' onClick={handleDone}>DONE</button>
      </div>
    </Modal>
  )
}

export default ModalBank;