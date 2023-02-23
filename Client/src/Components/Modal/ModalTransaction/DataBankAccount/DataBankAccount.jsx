import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Style from './DataBankAccount.module.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { useDispatch } from 'react-redux';
import { cancelTransaction } from '../../../../Slice/eventsManagement/eventsManagementSlice';



const DataBankAccount = ({ quantity }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { eventDetail } = useSelector(state => state.eventDetail);
  const { transactionWasCreated } = useSelector(state => state.eventsManagement);
  const [cancel, setCancel] = useState(false)
  
  const handleCancel = () => {
    setCancel(!cancel)
  }

  const handleAcept = () => {
    navigate(0) //ver, rompe el flujo
  }

  const handleDelete = () => {
    dispatch(cancelTransaction(transactionWasCreated.id))
  }

  return (


    <>
      <div className={cancel ? Style.containerOrderNoVisible : Style.containerOrder}>
        <div className={Style.containerDataBankAccount}>
          <header className={Style.modalHeader}>
              <FontAwesomeIcon icon={faCircleCheck} size='6x' />
          </header>

          <h2>Reservation made successfully <span>{`#${transactionWasCreated.id.slice(0, 8)}`}</span></h2>

          
          <div className={Style.textOrder}>
            The organizer will confirm the operation once the full amount has been paid to the indicated account.
          </div>

          <div className={Style.detailBankAccount}>
            <h3>{eventDetail.organizer?.name} {eventDetail.organizer?.last_name}</h3>
            <h3 className={Style.detailBankAccountName}> Bank: {eventDetail.bankAccount?.name}</h3>
            <h3 className={Style.detailBankAccountCBU}> CBU: {eventDetail.bankAccount?.CBU}</h3>
            <h3 className={Style.detailBankAccountCBU}> Amount: ${quantity * eventDetail.price}</h3>
          </div>

          <div className={Style.textOrder}>
            You must upload the proof of payment in the next step.
          </div>
          <div className={Style.bottomWrapper}>
            <button className={Style.cancelBtn}
              onClick={handleCancel}>
              Cancel reservation
            </button>

            <button
              className={Style.btnVoucher}
              onClick={handleAcept}>
              Continue
            </button>
          </div>
        </div>
      </div>

      <div className={cancel ? Style.containerCancel : Style.containerCancelNoVisible}>
        <FontAwesomeIcon icon={faCircleXmark} size='8x' color='#ff4235'/>
        <h2>Are you sure?</h2>
        <p className={Style.cancelMsg}>Are you sure you want to cancel this reservartion?</p>

        <div className={Style.containerBtn}>
          <div 
              className={Style.modifyGoOut}
              onClick={handleCancel}>
              No, keep reservation
          </div>
          <div
              className={Style.modifyStay}
              onClick={handleDelete}>
              Yes, cancel reservation
          </div>
        </div>
      </div>
    </>
  )
}

export default DataBankAccount

{/* <Voucher /> */ }




