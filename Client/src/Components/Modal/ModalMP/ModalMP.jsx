import React from 'react'
import Modal from '../Modal'
import style from './ModalMP.module.css'


const ModalMP = ({ setShowModal, selectedPack, paymentStatus, setPaymentStatus }) => {

  const handleClick = (e) => {
    e.preventDefault();
    setPaymentStatus('SUCCESS');
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal}>
      <div className={style.container}>
        <h1>Checkout details</h1>
        <p>{selectedPack.title}</p>
        <p>{selectedPack.unit_price}</p>
        <h1>Pay with Mercado Pago</h1>
        <button onClick={handleClick}>Pay me!</button>
      </div>
    </Modal>
  )
}

export default ModalMP;