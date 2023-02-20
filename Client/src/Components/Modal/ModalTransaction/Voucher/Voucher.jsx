import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Style from './Voucher.module.css'
import { API } from '../../../../App';
import { axiosPutTicket, axiosCANCELTicket } from '../../../../Slice/transaction/TransactionSlice';


const Voucher = () => {

  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(false)
  const [imgIsFetching, setImgIsFetching] = useState(false)
  const [pdfIsFetching, setpdfIsFetching] = useState(null)
  const [accepted, setAccepted] = useState(false);
  const { eventDetail } = useSelector(state => state.eventDetail);
  const { email } = useSelector(state => state.user)
  const refInputImg = useRef()
  const postDogIsFetching = useSelector(state => state.postDogIsFetching)
  const dataTransaction = useSelector(state => state.transaction)
  const id = dataTransaction?.transaction?.id
  const navigate = useNavigate()


  useEffect(() => {
    const getTransaction = async () => {
      setLoading(true)
      setError(false)
      if (!data) {
        try {
          const res = await API.get('/transaction/' + `${id}`)
          setLoading(false)
          setData(res.data)
        } catch (error) {
          console.log(error)
          setError(error)
          setLoading(false)
        }
      }
    }
    getTransaction()
  }, [id]);


  useEffect(() => {
    const urlPDF = {
      payment_proof: pdfIsFetching
    }
    dispatch(axiosPutTicket({ id, urlPDF }))
  }, [pdfIsFetching])

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
    if (e.dataTransfer.files && e.dataTransfer.files[0] && e.dataTransfer.files[0].type.startsWith('application/pdf')) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };


  const handleFiles = (file) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      var rawLog = reader.result.split(',')[1];
      var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
      setPreview(URL.createObjectURL(file))
      setImgIsFetching(true)
      fetch('https://script.google.com/macros/s/AKfycbxU47iTlWQkocTIWS_Wr_fO_U7zqLuQE3jF7QTMeChKn-d2KrNdOLrCsFerZeS50W_2Ow/exec', //your AppsScript URL
        { method: "POST", body: JSON.stringify(dataSend) })
        .then(res => res.json()).then(res => {
          setpdfIsFetching(res.url)
          setImgIsFetching(false)
        }).catch(e => console.log(e))
    }
  }

  const handleDelete = () => {
    dispatch(axiosCANCELTicket(id))
    navigate(0)
  }

  const handleAccept = () => {
    setAccepted(true);
  };


  return (
    data &&
    <div onDragEnter={handleDrag} className={Style.imageWrapper}>
      {
        !preview
          ?
          <div className={Style.containerVoucher}>
            {accepted && <div className={`${Style.imgUpload} ${postDogIsFetching ? Style.fetching : ''}`}>
              <input
                hidden
                id="imgInput"
                type="file"
                accept=".pdf"
                ref={refInputImg}
                onChange={(e) => handleFiles(e.target.files[0])}
              />
              <label className={Style.imgDropArea} htmlFor="imgInput">
                {!dragActive
                  ? <div className={Style.defaultDropArea}>
                    <p>Drag and drop a PDF here</p>
                    <p>or</p>
                    <button
                      type='button'
                      className={Style.uploadButton}
                      onClick={() => refInputImg.current.click()}
                    >
                      Upload a PDF
                    </button>
                  </div>
                  : <div className={Style.onDragDropArea}>
                    Drop your PDF here
                  </div>
                }
              </label>
            </div>}
            <h1 className={Style.containerVoucher_tittle}>Carga el comprobante de la operacion</h1>
            <h2 className={Style.containerVoucher_subTittle}>{email}</h2>
            <div className={Style.containerVoucher_cancelar}>
              <button
                type='button'
                className={'btnprimario'}
                onClick={handleDelete}>
                CANCELAR
              </button>
            </div>
            <div className={Style.containerVoucher_aceptar}>
              <button
                type='button'
                className={'btnprimario'}
                onClick={handleAccept}>
                ACEPTAR
              </button>
            </div>
          </div>

          : imgIsFetching
            ? <div className={Style.imgFetchingWrapper}>
              <div className={Style.uploadMsg}>Uploading PDF..</div>
            </div>
            : <div className={Style.imgPreviewWrappper}>
              <img className={Style.imgPreview} />

              <Link to='/'>
                <button
                  type='button'
                  className={'btnprimario'} >
                  Home
                </button>
              </Link>
            </div>

      }
      {dragActive && <div className={Style.dragImgElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
    </div>
  )
}

export default Voucher



