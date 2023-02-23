import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Style from './ModalVoucher.module.css'
import Modal from '../Modal';
import { cancelTransaction, loadPaymentProof } from '../../../Slice/eventsManagement/eventsManagementSlice';



const ModalVoucher = ({ setShowModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(false)
  const [fileIsFetching, setfileIsFetching] = useState(false)
  const [urlFile, seturlFile] = useState(null)
  const [imgDocument, setImgDocument] = useState(null)
  const [pdfDocument, setPdfDocument] = useState(null)
  const [accepted, setAccepted] = useState(true);
  const refInputImg = useRef()
  const { email } = useSelector(state => state.user)
  const { data: {buys: eventsBuyed}, loading: {get: loading} } = useSelector(state => state.eventsManagement);

  const transactionData = eventsBuyed.find(e => e.status === 'PENDING')
  const quantity = transactionData.tickets.length



  //useEffect que instanciar el urlFile, para hacer un PUT en el handle
  useEffect(() => {
    if (pdfDocument) {
      // const url = pdfDocument.replace("view", "download");
      seturlFile(pdfDocument)
    } else if (imgDocument) {
      seturlFile(imgDocument)
    }
  }, [pdfDocument, imgDocument])


  //handle que realiza el dispatch, de la url
  const handleAccept = () => {
    dispatch(loadPaymentProof({ id: transactionData.id, data: {payment_proof: urlFile} }))
  };



  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && (e.dataTransfer.files[0].type.startsWith('image/') || e.dataTransfer.files[0].type.startsWith('application/pdf'))) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFiles = (file) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      var rawLog = reader.result.split(',')[1];
      var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" };//preapre info to send to API

      if (file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file))
        setfileIsFetching(true)
        fetch('https://script.google.com/macros/s/AKfycbxU47iTlWQkocTIWS_Wr_fO_U7zqLuQE3jF7QTMeChKn-d2KrNdOLrCsFerZeS50W_2Ow/exec', //your AppsScript URL
          { method: "POST", body: JSON.stringify(dataSend) })
          .then(res => res.json()).then(res => {
            setImgDocument(res.url)
            setfileIsFetching(false)
            setAccepted(!accepted);
          }).catch(e => console.log(e))
      } else if (file.type.startsWith('application/pdf')) {
        setPreview(URL.createObjectURL(file))
        setfileIsFetching(true)
        fetch('https://script.google.com/macros/s/AKfycbxU47iTlWQkocTIWS_Wr_fO_U7zqLuQE3jF7QTMeChKn-d2KrNdOLrCsFerZeS50W_2Ow/exec', //your AppsScript URL
          { method: "POST", body: JSON.stringify(dataSend), })
          .then(res => res.json()).then(res => {
            setPdfDocument(res.url)
            setfileIsFetching(false)
            setAccepted(!accepted);
          }).catch(e => console.log(e))
      }
    }
  }

  const handleDelete = () => {
    dispatch(cancelTransaction(transactionData.id))
  }

  return (
    <Modal width={'1100px'} setShowModal={setShowModal}>
      {transactionData &&
        <div onDragEnter={handleDrag} className={Style.imageWrapper}>
          <div className={Style.containerLoadVoucher}>
            <h1 className={Style.containerVoucher_tittle}>Operation <p>{transactionData.id?.slice(0, 8)}</p></h1>
            <h2 className={Style.containerVoucher_subTittle}><p>user </p> {email}</h2>

            {
              !preview
                ?
                <div className={Style.containerVoucher}>
                  <input
                    hidden
                    id="imgInput"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    ref={refInputImg}
                    onChange={(e) => handleFiles(e.target.files[0])}
                  />
                  <label className={Style.imgDropArea} htmlFor="imgInput">
                    {!dragActive
                      ? <div className={Style.defaultDropArea}>
                        <p>Drag and drop a PDF or Image here</p>
                        <p>or</p>
                        <button
                          type='button'
                          className={Style.uploadButton}
                          onClick={() => refInputImg.current.click()}
                        >
                          Upload a PDF or Image
                        </button>
                      </div>
                      : <div className={Style.onDragDropArea}>
                        Drop your PDF or Image here
                      </div>
                    }
                  </label>
                </div>

                : fileIsFetching
                  ?
                  <div className={Style.uploadMsg}>
                    <h2>Loading receipt</h2>
                    <h3>Please wait</h3>
                    <div className={Style.spinner}><div></div><div></div><div></div><div></div></div>
                  </div>

                  : imgDocument
                    ?
                    <div className={Style.imgPreviewWrappper}>
                      <img className={Style.imgPreview} style={{ backgroundImage: `url(${preview})` }} />
                    </div>
                    :
                    <div className={Style.imgPreviewWrappper}>
                      <embed className={Style.embedPdf} src={`${pdfDocument}#toolbar=0`} type='application/pdf' />
                    </div>
            }

            <div className={Style.containerVoucher_button}>
              <button
                type='button'
                className={'btnprimario'}
                onClick={handleDelete}>
                CANCEL
              </button>

              <button
                type='button'
                className={accepted ? Style.btnAceptar : 'btnprimario'}
                disabled={accepted}
                onClick={handleAccept}>
                ACEPT
              </button>
            </div>
          </div>

          <div className={Style.detailWrapper}>
            <div className={Style.imgWrapper}>
              <img className={Style.detailEvent_img} src={transactionData.event.cover_pic} alt="" />
            </div>

            <div className={Style.detail}>
              <h3 className={Style.detailEvent_resume}>Order overview</h3>
              <div className={Style.detailEvent_tickets}>
                {quantity} x {transactionData.event.name}
                <span>{quantity * transactionData.event.price}</span>
              </div>
              <div className={Style.detailEvent_total}>
                Total: <span>{quantity * transactionData.event.price}</span>
              </div>

              <div className={Style.detailBankAccount}>
                <h2>Organizer {transactionData.event.organizer?.name} {transactionData.event.organizer?.last_name}</h2>
                <h3 className={Style.detailBankAccount_CBU_name}> Account {transactionData.event.bankAccount?.name} {transactionData.event.bankAccount?.CBU}</h3>
              </div>
            </div>
          </div>
          {dragActive && <div className={Style.dragImgElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </div>}
    </Modal>
  )
}

export default ModalVoucher

