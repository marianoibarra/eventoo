import { TextField } from '@mui/material';
import React from 'react'
import Modal from '../Modal'
import style from './ModalFormEvent.module.css';


const ModalFormEvent = ({stgData, setConfirm, setShowModal}) => {
 
  const lastTime = localStorage.getItem("lastTime");

  

  return (
    <Modal setShowModal={setShowModal}>
      <div className={style.container}>
        <h3 className={style.title}>It seems you were creating an event</h3>
        <TextField
          id="standard-read-only-input"
          label="Event name"
          defaultValue={stgData.name}
          sx={{m: 1, width: '30ch' }}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Last time edited"
          defaultValue={lastTime}
          sx={{m: 1, width:'55ch'}}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <h2 className={style.title2}>What would you like to do?</h2>
        <div className={style.buttons}>
          <button className={style.continue} onClick={() => {setConfirm(true); setShowModal(false)}}>Continue</button>
          <div className={style.or2}>
            <div className={style.or}></div>
            <p className={style.or3}>or</p>
            <div className={style.or}></div>
          </div>
          <button className={style.dischard} onClick={() => {setConfirm(false); setShowModal(false)}}>Dischard</button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalFormEvent;