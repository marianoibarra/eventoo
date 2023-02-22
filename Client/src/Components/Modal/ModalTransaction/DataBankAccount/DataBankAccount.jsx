import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Style from './DataBankAccount.module.css'
import { GiConfirmed } from "react-icons/gi";
import Checkbox from '@material-ui/core/Checkbox';
import { axiosCANCELTicket } from '../../../../Slice/transaction/TransactionSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useDispatch } from 'react-redux';



const DataBankAccount = ({ quantity }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { eventDetail } = useSelector(state => state.eventDetail);
  const [cancel, setCancel] = useState(false)
  const idTransaction = eventDetail.id
  
  const handleCancel = () => {
    setCancel(!cancel)
  }

  const handleAcept = () => {
    navigate(0)
  }

  const handleDelete = () => {
    dispatch(axiosCANCELTicket(idTransaction))
    navigate(0)
  }

  return (


    <>
      <div className={cancel ? Style.containerOrderNoVisible : Style.containerOrder}>
        <div className={Style.containerDataBankAccount}>
          <header className={Style.modalHeader}>
              <FontAwesomeIcon icon={faCircleCheck} size='6x' />
          </header>

          <h2>Reservation made successfully <span>{`#${idTransaction.slice(0, 8)}`}</span></h2>

          
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
              Cancel reserve
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
        <h2>Do you want to abandon the purchase process?</h2>
        <p className={Style.cancelMsg}>Are you sure you want to leave the page? The items you selected may not be available later.</p>

        <div className={Style.containerBtn}>
          <div className={Style.btnGoOut}>
            <button
              className={`btnprimario ${Style.modifyGoOut}`}
              onClick={handleCancel}>
              NO
            </button>
          </div>
          <div className={Style.btnStay}>
            <button
              className={`btnprimario ${Style.modifyStay}`}
              onClick={handleDelete}>
              YES
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default DataBankAccount

{/* <Voucher /> */ }




