import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent } from '../../../Slice/eventsManagement/eventsManagementSlice';
import Modal from '../Modal'
import style from './ModalDeleteEvent.module.css';


const ModalDeleteEvent = ({setShowModal, eventId}) => {

  const dispatch = useDispatch();
  const { deleteMsg } = useSelector(state => state.eventsManagement);

  function handleAcept() {
    dispatch(deleteEvent(eventId));
  }

  return (
    <Modal width={'600px'} height={'400px'} setShowModal={setShowModal}>
      { !deleteMsg ?
        <>
          <div className={style.container_title}>
            <h1>Are you sure you want to delete the event?</h1>
          </div>
          
          <p className={style.text}>If you delete the event, no user will be able to see it and you will have to create the event again.</p>
          
          <div className={style.container_buttons}>
            <button className={`btnprimario`} onClick={() => setShowModal(false)}>No</button>
            <button className={`btnprimario`} onClick={handleAcept}>Yes</button>
          </div>
        </>
        :
        <div className={style.container_result}>
          <p>{deleteMsg.data}</p>
          <button className={`btnprimario`} onClick={() => setShowModal(false)}>Acept</button>
        </div>
      }
    </Modal>
  )
}

export default ModalDeleteEvent;