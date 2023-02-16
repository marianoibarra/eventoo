import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SessionContext } from '../../..';
import ModalBank from '../../Modal/ModalBank/ModalBank';
import ButtonGroup from '../Category/ButtonGroup';
import style from './Tickets.module.css';
import Textfield from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



function Tickets({ input, setInput, errors, showMsg, setShowMsg }) {
  const dispatch = useDispatch();
  const [isPublic, setIsPublic] = useState(true);
  const [isPaid, setIsPaid] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { bankAccount } = useSelector(state => state.bankAccounts);
  const accountID = input.bankAccount;
  const selectedAccount = bankAccount.filter(c => c.id === accountID)[0];
  const { setShowSessionModal } = useContext(SessionContext);
  const { isLogged } = useSelector(state => state.user);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
  }, [isPublic]);


  const handleBlur = (e) => {
    setShowMsg({
      ...showMsg,
      [e.target.name]: true,
    })
  }

  const handleChange = e => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleGroupPrice = (e) => {
    setInput({
      ...input,
      isPaid: e.target.name === 'Paid',
    });
  };

  const handleGroupPublic = (e) => {
    console.log('public', input.isPublic, input)
    setInput({
      ...input,
      isPublic: e.target.name === 'Public',
    });
  };

  return (
    <div className={style.container}>
      {showModal && <ModalBank setShowModal={setShowModal} input={input} setInput={setInput} />}
      <h1 className={style.title}>Tickets</h1>
      <p className={style.text}>
        Please choose if the event will be public or private.
      </p>
      <ButtonGroup
        buttons={["Public", "Private"]}
        handleGroup={handleGroupPublic}
        input={input}
      />
      {input.isPublic === false && (<>
        <p>Remember private events will not show in the home page</p>
        <h4 style={{margin:'15px'}} >Enter a password for your guests so only them will have the access</h4>
        <Textfield
        required
          name="privateEvent_password"
          variant="standard"
          label="Password"
          value={input.privateEvent_password}
          onChange={handleChange}
          margin="dense"
          helperText={showMsg.privateEvent_password ? errors.privateEvent_password : ""}
          error={showMsg.privateEvent_password && errors.privateEvent_password}
          type={showPassword ? "text" : "password"}
          style={{ marginBottom: showMsg.privateEvent_password && errors.privateEvent_password ? '0px' : '23px' }}
          onBlur={handleBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </>
      )}
      <p className={style.text}>
        Choose if your guests will pay for asist to the event.
      </p>
      <ButtonGroup
        buttons={["Paid", "Free"]}
        handleGroup={handleGroupPrice}
        input={input}
      />
      <h4 className={style.parr}>Capacity:</h4>
      <input
        placeholder='Capacity'
        className={style.inputs}
        name='guests_capacity'
        value={input.guests_capacity}
        onChange={handleChange}
        onBlur={handleBlur}
        style={showMsg.guests_capacity && errors.guests_capacity ? { border: 'red 1px solid' } : {}} />
      {showMsg.guests_capacity && (
        <p className={style.warning}>{errors.guests_capacity}</p>
      )}
      {input.isPaid === true && (
        <div className={style.priceContainer}>
          <h4 className={style.parr}>Price:</h4>
          <input
            placeholder='$'
            className={style.inputs}
            name='price'
            value={input.price}
            onChange={handleChange}
            onBlur={handleBlur}
            style={showMsg.price && errors.price ? { border: 'red 1px solid' } : {}} />
          {showMsg.price && (
            <p className={style.warning}>{errors.price}</p>
          )}

          {isLogged
            ? <button type='button' className={style.bankAcc} onClick={() => setShowModal(!showModal)}>Select Bank Account</button>
            : <>
              <p>Please log in for select bank account</p>
              <button type='button' className={style.bankAcc} onClick={() => setShowSessionModal("login")}>Log In</button>
            </>}
          {input.bankAccount && (
            <div className={style.accountSelected}>
              <h3 className={style.parr}>Bank Account selected:</h3>
              <p>{selectedAccount.name}</p>
              <p>{selectedAccount.CBU}</p>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default Tickets;