import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Style from './ModalTransition.module.css'
import Modal from '../Modal'
import DataBankAccount from './DataBankAccount/DataBankAccount'
import { postNewTransaction } from '../../../Slice/eventsManagement/eventsManagementSlice'
import SpinnerWhite from '../../../utils/SpinnerWhite/SpinnerWhite'


const ModalTransaction = ({ setShowModal, quantity }) => {
  const dispatch = useDispatch()
  const [ticketForms, setTicketForms] = useState(Array.from({ length: quantity }, () => ({})));
  const { eventDetail } = useSelector(state => state.eventDetail);
  const { email } = useSelector(state => state.user)
  // const { transaction, loading, error } = useSelector(state => state.transaction)
  const { data: {buys: eventsBuyed}, loading: {post: loading}, error, transactionWasCreated } = useSelector(state => state.eventsManagement)
  const [isButtonDisabled, setisButtonDisabled] = useState(true)
  


  const handleDataTicket = (e, index) => {
    const updatedForm = { ...ticketForms[index], [e.target.name]: e.target.value };
    setTicketForms(ticketForms => ([...ticketForms.slice(0, index), updatedForm, ...ticketForms.slice(index + 1)]));

    // Validaciones de los campos name, last_name y email
    const isValidName = updatedForm.name && updatedForm.name.trim().length >= 2;
    const isValidLastName = updatedForm.last_name && updatedForm.last_name.trim().length >= 2;
    const isValidEmail = updatedForm.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedForm.email);

    // Actualizar el estado de isButtonDisabled en consecuencia
    setisButtonDisabled(
      !isValidName ||
      !isValidLastName ||
      !isValidEmail ||
      !ticketForms.every(form => Object.values(form).every(value => value.trim().length > 0))
    );
  };

  const handleSubmit = () => {
    dispatch(postNewTransaction({
      eventId: eventDetail.id,
      tickets: ticketForms
    }))
    setisButtonDisabled(true)
  }


  const renderTicketForm = (index) => (
    <div key={index} className={Style.container_dataTicket}>

      <h2 className={Style.dataTicket_subTitle}>Ticket {index + 1} {eventDetail.name}</h2>
      <div className={Style.firstRow}>
        <input
          className={Style.input_name}
          type="text"
          name="name"
          value={ticketForms[index].name || ''}
          placeholder="Ingrese Name"
          onChange={(e) => handleDataTicket(e, index)}
        />
        <input
          className={Style.input_lastName}
          type="text"
          name="last_name"
          value={ticketForms[index].last_name || ''}
          placeholder="Ingrese Last Name"
          onChange={(e) => handleDataTicket(e, index)}
        />
      </div>

      <input
        className={Style.input_email}
        type="email"
        name="email"
        value={ticketForms[index].email || ''}
        placeholder="Ingrese email"
        onChange={(e) => handleDataTicket(e, index)}
      />
    </div>
  );

  const ticketFormArray = Array.from({ length: quantity }, (_, i) => renderTicketForm(i));

  return (
    <Modal width={'1100px'} setShowModal={setShowModal}>
      {
        transactionWasCreated
          ? <DataBankAccount quantity={quantity} />
          : loading
              ? <SpinnerWhite />
              : error
                ? <p>{error}</p>
                : <div className={true ? Style.containerBuyTickets : Style.containerDisplayNone}>
                    <div className={Style.topWrapper}>
                      <div className={Style.formWrapper}>
                        <header>
                          <h1 className={Style.dataTicket_title}>Purchase order info</h1>
                          <h3 className={Style.dataTicket_user}>by <span>{email}</span></h3>
                        </header>
                        <main>
                          {ticketFormArray}
                        </main>
                      </div>
                      <div className={Style.detailWrapper}>
                        <div className={Style.imgWrapper}>
                          <img className={Style.detailEvent_img} src={eventDetail.cover_pic} alt="" />
                        </div>
        
                        <div className={Style.detail}>
                          <h3 className={Style.detailEvent_resume}>Order overview</h3>
                          <div className={Style.detailEvent_tickets}>
                            {ticketForms.length} x {eventDetail.name}
                            <span>{ticketForms.length * eventDetail.price}</span>
                          </div>
                          <div className={Style.detailEvent_total}>
                            Total: <span>{ticketForms.length * eventDetail.price}</span>
                          </div>
                        </div>
                      </div>
        
                    </div>
        
                    <div className={Style.bottomWrapper}>
                      <div className={Style.modify}>
                        <button
                          className={isButtonDisabled ? Style.btnPedido : `btnprimario `}
                          onClick={handleSubmit}
                          disabled={isButtonDisabled} >
                          Reserve
                        </button>
                      </div>
                    </div>
                  </div>
      }
    </Modal>
  )
}

export default ModalTransaction;


