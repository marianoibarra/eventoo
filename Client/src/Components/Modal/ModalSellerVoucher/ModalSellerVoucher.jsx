import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { putApprovePayment } from '../../../Slice/eventsManagement/eventsManagementSlice'
import Modal from '../Modal'
import { Spinner } from '../Spinner/Spinner'
import styles from './ModalSellerVoucher.module.css'
import { TiCancel } from "react-icons/ti";
import { TiTick } from "react-icons/ti";

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
    <Modal width={'500px'} height={'250px'} setShowModal={setShowModal}>
      {
        btnSelector === 'acept' ?
          <div className={styles.containerReceipt}>
            <div className={styles.receiptHeader}>
              <TiTick className={styles.icon} />
              <p>Send Receipt</p>
            </div>
            <h2 className={styles.receiptTittle}>Are you sure you want to confirm this operation?</h2>
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
            <h2 className={styles.OperationTittle}>Are you sure you want to cancel this operation?</h2>
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

export default ModalSellerVoucher


{/* <div onClick={() => setShowModal(false)}>x</div> */ }