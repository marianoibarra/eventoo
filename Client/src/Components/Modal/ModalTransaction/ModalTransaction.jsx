import React, { useState } from 'react'
import Style from './ModalTransition.module.css'
import Tickets from '../../Tickets/Tickets'
import Modal from '../Modal'
import { useDispatch } from 'react-redux'


const ModalTransaction = ({ setShowModal, tickets }) => {

  const dispatch = useDispatch()
  const [dataTicket, setDataTicket] = useState([])
  const sendTickets = []

  const handleDataTicket = t => {
    setDataTicket({
      ...dataTicket,
      [t.target.name]: t.target.value
    });
  }

  const handleSendTicket = () => {
    sendTickets.push(dataTicket)
    setDataTicket('')
  }

  const handleAxiosTicket = () => {
    dispatch('armar el axiosPostTicket y pasarle (senTickets)')
  }


  return (
    <Modal width={'1200px'} setShowModal={setShowModal}>
      <input
        className={Style.input_email}
        type='email' name='email'
        laceholder='Ingrese email'
        onChange={handleDataTicket}
      />

      <input
        className={Style.input_email}
        type='text'
        name='name'
        placeholder='Ingrese Name'
        onChange={handleDataTicket}
      />

      <input
        className={Style.input_email}
        type='text'
        name='last_Name'
        placeholder='Ingrese Last_Name'
        onChange={handleDataTicket}
      />

      <button onClick={handleSendTicket}> Cargar Ticket</button>
      {
        sendTickets.map(d => {
          <Tickets
            name={d.name}
            last_name={d.last_name}
            email={d.email}
          />
        })
      }

      <button onClick={handleSendTicket}> Enviar TICKETS</button>
      {/* Este bton es el que realiza el POST de todo los tickets se habilita o desabilita en funcion de la cantidad de tickets que faltan
      cargar, comparacion con los tickets que viene por parametros en el modal con el .length de sendTickets */}

    </Modal>
  )
}

export default ModalTransaction