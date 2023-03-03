import React from 'react'
import { useDispatch } from 'react-redux'
import { cancelTransaction, loadPaymentProof } from '../../../Slice/eventsManagement/eventsManagementSlice'
import Modal from '../Modal'
import styles from './ModalBuysVoucher.module.css'
import { TiCancel } from "react-icons/ti";
import { RiMailSendLine } from "react-icons/ri";


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
    <Modal width={'500px'} height={'250px'} setShowModal={setShowModal}>
      {
        btnSelector === 'acept' ?
          <div className={styles.containerReceipt}>
            <div className={styles.receiptHeader}>
              <RiMailSendLine className={styles.icon} />
              <p>Send Receipt</p>
            </div>
            <h2 className={styles.receiptTittle}>Do you really want to send this receipt?</h2>
            <div className={styles.receiptBtns}>
              <button
                type='button'
                className={`btnprimario ${styles.modifyNo}`}
                onClick={() => setShowModal(false)}>
                No
              </button>
              <button
                type='button'
                className={`btnprimario ${styles.modifyYes}`}
                onClick={handleBtnAcept}>
                Yes
              </button>
            </div>
          </div> :
          <div className={styles.containerOperation}>
            <div className={styles.receiptHeaderCancel}>
              <TiCancel className={styles.icon} />
              <p>Cancel Operation</p>
            </div>
            <h2 className={styles.OperationTittle}>Do you really want to cancel this operation?</h2>
            <div className={styles.operationBtns}>
              <button
                type='button'
                className={`btnprimario ${styles.modifyNo}`}
                onClick={() => setShowModal(false)}>
                No
              </button>
              <button
                type='button'
                className={`btnprimario ${styles.modifyYes}`}
                onClick={handleBtnCancel}>
                Yes
              </button>
            </div>
          </div>
      }
    </Modal>
  )
}

export default ModalBuysVoucher
