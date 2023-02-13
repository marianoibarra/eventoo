import React from 'react'
import Modal from '../Modal'


const ModalFormEvent = ({stgData, setConfirm, setShowModal}) => {
 
  const lastTime = localStorage.getItem("lastTime");

  

  return (
    <Modal setShowModal={setShowModal}>
      <div>
        <h2>It seems you were creating an event</h2>
        <h3>Data loaded</h3>
        <p>Event name: {stgData.name}</p>
        <p>Save date: {lastTime}</p>
        <h2>What would you like to do?</h2>
        <div>
          <button onClick={() => {setConfirm(true); setShowModal(false)}}>Continue</button>
          <button onClick={() => {setConfirm(false); setShowModal(false)}}>Dischard</button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalFormEvent;