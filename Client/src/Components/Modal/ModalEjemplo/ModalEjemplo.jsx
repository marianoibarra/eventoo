import React, { useState } from 'react'
import Modal from '../Modal'


const ModalEjemplo = ({setShowModal}) => {
  const [dataTicket, setDataTicket] = useState([])
   
  
  const handleDataTicket = t => {
    setDataTicket({
      ...dataTicket,
      [t.target.name]: t.target.value
    });
  }
  return (
 

    <Modal setShowModal={setShowModal}>
         <input
       
        type='email' name='email'
        laceholder='Ingrese email'
        onClick={handleDataTicket}
      />
    </Modal>
  )
}

export default ModalEjemplo