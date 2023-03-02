import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Modal from '../Modal'
import style from './ModalCreate.module.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const ModalCreate = ({ setShowModal}) => {

  return (
    <Modal setShowModal={setShowModal} className={style.modal}>
      <div className={style.container}>
        <div className={style.icon}>
        <CheckCircleIcon
         sx={{ color: '#1ac25b',
         fontSize: 130
        }}
         size={80}/>
        </div>
      <div className={style.text}>
        <h1>Your Event has been created succesfully!</h1>
        <h3>Let's check it up!</h3>
      </div>
      </div>
    </Modal>
  )
}

export default ModalCreate;