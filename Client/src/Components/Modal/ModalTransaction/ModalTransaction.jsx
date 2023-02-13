import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Style from './ModalTransition.module.css'
import Tickets from '../../Tickets/Tickets'
import Modal from '../Modal'
import { axiosPostTicket } from '../../../Slice/transaction/TransactionSlice'
import { Link } from 'react-router-dom'


const ModalTransaction = ({ setShowModal, tickets }) => {

  const dispatch = useDispatch()
  //const [showModal, setShowModal] = useState(false)
  const [dataTicket, setDataTicket] = useState([])
  const [loadTicket, setloadTicket] = useState([])
  const [btnLoad, setBtnLoad] = useState(true)
  const [btnSend, setBtnSend] = useState(true)
  const { eventDetail } = useSelector(state => state.eventDetail);

  const handleDataTicket = t => {
    setDataTicket({
      ...dataTicket,
      [t.target.name]: t.target.value
    });
  }

  const {transaction} = useSelector(state => state.transaction)

  const checkLoad = () => {
    const { last_name, name, gmail } = dataTicket;
    if (last_name && name && gmail && loadTicket.length < tickets) {
      setBtnLoad(false);
    } else {
      setBtnLoad(true);
    }
  };

  const checkSend = () => {
    if (loadTicket.length < tickets) {
      setBtnSend(true);
    } else {
      setBtnSend(false);
    }
  }


  useEffect(() => {
    checkLoad();
  }, [dataTicket]);

  useEffect(() => {
    checkSend();
  }, [loadTicket]);



  const handleLoadTicket = () => {
    setloadTicket([...loadTicket, dataTicket]);
    setDataTicket({
      last_name: '',
      name: '',
      gmail: ''
    });
  }


  const handleAxiosTicket = () => {
    const object = {
      isPaid: true,
      eventId: eventDetail.id,
      tickets: loadTicket
    }
    dispatch(axiosPostTicket({object}))
  }


  return (
    <Modal width={'1200px'} setShowModal={setShowModal}>

      <input
        className={Style.input_email}
        type='text'
        name='last_name'
        value={dataTicket.last_name}
        placeholder='Ingrese Last Name'
        onChange={handleDataTicket}
      />
      <input
        className={Style.input_email}
        type='text'
        name='name'
        value={dataTicket.name}
        placeholder='Ingrese Name'
        onChange={handleDataTicket}
      />

      <input
        className={Style.input_email}
        type='email'
        name='gmail'
        value={dataTicket.gmail}
        placeholder='Ingrese email'
        onChange={handleDataTicket}
      />
      {loadTicket?.map(d => (
        <Tickets
          email={d.gmail}
          last_name={d.last_name}
          name={d.name}
        />
      ))
      }
      <button onClick={handleLoadTicket} disabled={btnLoad}> Cargar Ticket</button>

      <button onClick={handleAxiosTicket} disabled={btnSend} > Enviar TICKETS</button>

      {transaction &&
      <Link to={`/modal-voucher/${transaction.id}`}>
        <button> Prueba Voucher</button>
      </Link>
      }



      {/* Este btn es el que realiza el POST de todo los tickets se habilita o desabilita en funcion de la cantidad de tickets que faltan
      cargar, comparacion con los tickets que viene por parametros en el modal con el .length de loadTicket */}

    </Modal>
  )
}

export default ModalTransaction





