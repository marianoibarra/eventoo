import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Style from './DataBankAccount.module.css'
import { GiConfirmed } from "react-icons/gi";
import Checkbox from '@material-ui/core/Checkbox';
import { axiosCANCELTicket } from '../../../../Slice/transaction/TransactionSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const DataBankAccount = ({ quantity }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { eventDetail } = useSelector(state => state.eventDetail);
  const [confirmed, setConfirmed] = useState(true)
  const [cancel, setCancel] = useState(false)
  const ticketForms = quantity
  const idTransaction = eventDetail.id

  const handleConfirmed = () => {
    setConfirmed(!confirmed)
  }

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
          <header>
            <span className={Style.iconspan}> <GiConfirmed size={20} /> </span>
            <h2>!Thanks for order! <p>{`#${idTransaction.slice(0, 8)}`}</p></h2>
          </header>

          <div className={Style.textOrder}>
            <p>The organizer will confirm the operation once the full amount has been paid to the indicated account. You can upload the proof of payment in the next step.</p>
          </div>

          <div className={Style.detailBankAccount}>
            <h2>Organizer {eventDetail.organizer?.name} {eventDetail.organizer?.last_name}</h2>
            <h3 className={Style.detailBankAccount_CBU_name}> Account {eventDetail.bankAccount?.name} {eventDetail.bankAccount?.CBU}</h3>
          </div>

          <div className={Style.container_infoTickets}>

            <h2 className={Style.eventName}>Event
              <p>{eventDetail.name}</p>
            </h2>

            <div className={Style.eventDateTimeAndLocation}>
              <h2 className={Style.eventLocation}>Location
                <p>{eventDetail.address.address_line}, State {eventDetail.address.state}</p></h2>
              <h2 className={Style.eventDateTime}>Date
                <p>begin {eventDetail.end_date} at {eventDetail.end_time}</p>
              </h2>
            </div>

            <h2 className={Style.eventMsg}>Message from Eventoo:
              <div className={Style.checkBoxMsg}>
                <Checkbox color="success"
                  onClick={handleConfirmed}
                />
                <p className={confirmed ? '' : Style.confirmeMsg}>Thank you for accepting us. Remember to pay the full amount of the transaction and upload the receipt on our platform.</p>
              </div>
            </h2>

          </div>
        </div>


        <div className={Style.detailWrapper}>
          <div className={Style.imgWrapper}>
            <img className={Style.detailEvent_img} src={eventDetail.cover_pic} alt="" />
          </div>

          <div className={Style.detail}>
            <h3 className={Style.detailEvent_resume}>Order overview</h3>
            <div className={Style.detailEvent_tickets}>
              {ticketForms} x {eventDetail.name}
              <span>{ticketForms * eventDetail.price}</span>
            </div>
            <div className={Style.detailEvent_total}>
              Total: <span>{ticketForms * eventDetail.price}</span>
            </div>
          </div>
        </div>

        <div className={Style.bottomWrapper}>
          <button className={`btnprimario `}
            onClick={handleCancel}>
            Cancel
          </button>

          <button
            className={confirmed ? Style.btnVoucher : `btnprimario `}
            disabled={confirmed}
            onClick={handleAcept}>
            Acept
          </button>
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




