import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from '../Modal'
import { createBankAccount } from '../../../Slice/BankAcount/BankAcount';
import { useDispatch, useSelector } from 'react-redux';
import BankAccountCards from './BankAccountCards';
import style from './ModalBank.module.css'

const ModalBank = ({setShowModal, input, setInput}) => {

  const dispatch = useDispatch();
  const [name,setName] = useState('');
  const [CBU, setCBU] = useState('');
  const {bankAccount} = useSelector(state => state.bankAccounts);
  const [errors, setErrors] = useState({});
  const [showMsg, setShowMsg] = useState ({});


  function validate(name, CBU) {
    let errors={}
    if(!name) {errors.name= 'There must be a bank name'}
    const num = parseInt(CBU)
    if(CBU.length === 0){errors.cbu ='You must enter a CBU';
    } else if(isNaN(num) || num < 0){
      errors.cbu ='Enter a valid number CBU';
    } else if(CBU.length !== 22) {errors.cbu= 'CBU must be 22 numeric digits'};

    return errors;
  }
  const cbuNums = CBU.length;

  useEffect((name,cbu) => {
    const cbuNums = CBU.length;
    console.log('cbu',CBU, 'name', name, cbuNums)
  },[name, CBU]);

  const handleBlur = (e) => {
    setErrors(validate(name,CBU));
    setShowMsg({
      ...showMsg,
      [e.target.name]: true,
    })
  }

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
        <input type="text"
        value={input.bankAcount}
        placeholder='Name'
        name='name'
        onChange={(e) => setName(e.target.value)}
        onBlur={handleBlur}
        style={showMsg.name && errors.name ? { border: 'red 1px solid' } : {}}
        />
        {errors.name&&(
                            <p className={style.warning}>{errors.name}</p>
                        )}
        <input type="text"
        value={input.bankAcount}
        placeholder='CBU'
        name='cbu'
        onChange={(e) => setCBU(e.target.value)}
        onBlur={handleBlur}
        maxLength='22'
        style={showMsg.cbu && errors.cbu ? { border: 'red 1px solid' } : {}}
        /> <p>{cbuNums}/22</p>
        {errors.cbu&&(
                            <p className={style.warning}>{errors.cbu}</p>
                        )}
        <button type="button" onClick={handleClick}>Create Bank Account</button>
      </div>
      <button type='button' onClick={handleDone}>DONE</button>
      </div>
    </Modal>
  )
}

export default ModalBank;