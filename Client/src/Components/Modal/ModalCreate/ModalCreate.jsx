import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Modal from '../Modal'
import style from './ModalCreate.module.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Spinner } from '../Spinner/Spinner';


const ModalCreate = ({ setShowModal}) => {

  return (
    <Modal setShowModal={setShowModal} width={'auto'} height={'40%'}>
      <div className={style.container}>
        <div className={style.icon}>
        <CheckCircleIcon
         sx={{ color: '#ffff',
         fontSize: 130
        }}
         size={80}/>
        </div>
      <div className={style.text}>
        <h1>Your event has been created succesfully!</h1>
        <h4>Redirecting to your event</h4>
        <div className={style.spinner}><div></div><div></div><div></div><div></div></div></div>
      </div>
    </Modal>
  )
}

export default ModalCreate;