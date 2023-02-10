import React from 'react'
import Modal from '../Modal'


const ModalEjemplo = ({setShowModal}) => {
  return (
    <Modal setShowModal={setShowModal}>
      <h1>Este es un modal de ejemplo</h1>
    </Modal>
  )
}

export default ModalEjemplo