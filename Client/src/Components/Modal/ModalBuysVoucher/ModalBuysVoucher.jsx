import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cancelTransaction, loadPaymentProof, putApprovePayment } from '../../../Slice/eventsManagement/eventsManagementSlice'
import Modal from '../Modal'
import { Spinner } from '../Spinner/Spinner'


const ModalBuysVoucher = ({ setShowModal, transaction, btnSelector, payment_proof, format }) => {
  // const { loading: { put } } = useSelector(state => state.eventsManagement)
  const dispatch = useDispatch()


  const handleBtnAcept = () => {
    dispatch(loadPaymentProof({ id: transaction, data: { payment_proof: payment_proof, format: format } }))
    setShowModal(false)
  }


  const handleBtnCancel = () => {
    dispatch(cancelTransaction(transaction))
    setShowModal(false)
  }


  return (
    <Modal width={'300px'} height={'200px'} setShowModal={setShowModal}>
      {
        btnSelector === 'acept' ?
          <div>
            <h2>Realmente desea enviar este comprobante?</h2>
            <button
              type='button'
              className={'btnprimario'}
              onClick={() => setShowModal(false)}>
              No
            </button>
            <button
              type='button'
              className={'btnprimario'}
              onClick={handleBtnAcept}>
              Yes
            </button>
          </div> :
          <div>
            <h2>Realmente desea cancelar esta operacion?</h2>
            <button
              type='button'
              className={'btnprimario'}
              onClick={() => setShowModal(false)}>
              No
            </button>
            <button
              type='button'
              className={'btnprimario'}
              onClick={handleBtnCancel}>
              Yes
            </button>
          </div>
      }
    </Modal>
  )
}

export default ModalBuysVoucher
