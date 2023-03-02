import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { putApprovePayment } from '../../../Slice/eventsManagement/eventsManagementSlice'
import Modal from '../Modal'
import { Spinner } from '../Spinner/Spinner'


const ModalSellerVoucher = ({ setShowModal, transaction, btnSelector }) => {
  // const { loading: { put } } = useSelector(state => state.eventsManagement)
  const dispatch = useDispatch()

  const handleBtnAcept = () => {
    dispatch(putApprovePayment({ id: transaction.id, data: { isApproved: true } }))
    setShowModal(false)
  }


  const handleBtnCancel = () => {
    dispatch(putApprovePayment({ id: transaction.id, data: { isApproved: false } }))
    setShowModal(false)
  }


  return (
    <Modal width={'300px'} height={'200px'} setShowModal={setShowModal}>
      {
        btnSelector === 'acept' ?
          <div>
            <h2>Realmente desea confirmar esta operacion?</h2>
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

export default ModalSellerVoucher


{/* <div onClick={() => setShowModal(false)}>x</div> */ }