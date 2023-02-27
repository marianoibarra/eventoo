import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from '../Modal'
import { createBankAccount } from '../../../Slice/BankAcount/BankAcount';
import { useDispatch, useSelector } from 'react-redux';
import BankAccountCards from './BankAccountCards';
import style from './ModalBank.module.css'
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';


const ModalBank = ({ setShowModal, input, setInput }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [CBU, setCBU] = useState('');
  const { bankAccount } = useSelector(state => state.bankAccounts);
  const [errors, setErrors] = useState({});
  const [showMsg, setShowMsg] = useState({});


  function validate(name, CBU) {
    let errors = {}
    if (!name) { errors.name = 'There must be a bank name' }
    const num = parseInt(CBU)
    if (CBU.length === 0) {
      errors.cbu = 'You must enter a CBU';
    } else if (isNaN(num) || num < 0) {
      errors.cbu = 'Enter a valid number CBU';
    } else if (CBU.length !== 22) { errors.cbu = 'CBU must be 22 numeric digits' };

    return errors;
  }
  const cbuNums = CBU.length;

  useEffect((name, cbu) => {
    const cbuNums = CBU.length;
  }, [name, CBU]);

  const handleBlur = (e) => {
    setErrors(validate(name, CBU));
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
        <div className={style.or2}>
          <div className={style.or}></div>
          <p className={style.or3}>or</p>
          <div className={style.or}></div>
        </div>
        <div className={style.createAccount}>
          <h2>Create a new bank account</h2>
          <TextField
            label="Bank name"
            name='name'
            variant="standard"
            value={input.bankAcount}
            sx={{ width: '35ch' }}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            margin="dense"
            helperText={showMsg.name ? errors.name : ""}
            error={showMsg.name && errors.name}
            style={{ marginBottom: showMsg.name && errors.name ? '0px' : '20px' }}
          />
          <div className={style.cbu}>
          <TextField
            label="CBU"
            name='cbu'
            variant="standard"
            value={input.bankAcount}
            sx={{ width: '27ch' }}
            placeholder='CBU'
            onChange={(e) => setCBU(e.target.value)}
            onBlur={handleBlur}
            margin="dense"
            maxLength='22'
            endAdornment={<InputAdornment position="end">{cbuNums}/22</InputAdornment>}
            helperText={showMsg.cbu ? errors.cbu : ""}
            error={showMsg.cbu && errors.cbu}
            style={{ marginBottom: showMsg.cbu && errors.cbu ? '0px' : '20px' }}
          /> <p>{cbuNums}/22</p>
          </div>
          <button type="button" className={style.butcreate} onClick={handleClick}>Create Bank Account</button>
        </div>
        <button type='button' className={style.btnDone} onClick={handleDone}>DONE</button>
      </div>
    </Modal>
  )
}

export default ModalBank;