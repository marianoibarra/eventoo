import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Style from './ModalVoucher.module.css'
import { API } from '../../App';
import { axiosPutTicket, axiosCANCELTicket } from '../../Slice/transaction/TransactionSlice';
import ModalCancel from '../Modal/ModalCancel/ModalCancel';

const ModalVoucher = () => {

  const dispatch = useDispatch()
  const { id } = useParams()
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(false)
  const refInputImg = useRef()
  const postDogIsFetching = useSelector(state => state.postDogIsFetching)
  const [imgIsFetching, setImgIsFetching] = useState(false)
  const [pdfIsFetching, setpdfIsFetching] = useState(null)



  useEffect(() => {
    const getTransaction = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await API.get(`/transaction/${id}`)
        setLoading(false)
        setData(res.data)
      } catch (error) {
        console.log(error)
        setError(error)
        setLoading(false)
      }
    }

    getTransaction()
  }, []);


  const handleVoucher = () => {
    const urlPDF = {
      payment_proof: pdfIsFetching
    }
    dispatch(axiosPutTicket({ id, urlPDF }))
  }




  if (loading) return <h1>Loading..</h1>
  if (error) return <h1>{error.msg ? error.msg : 'error'}.</h1>
  console.log(data, 'soy la data')

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



  return (
    data &&
    <div onDragEnter={handleDrag} className={Style.imageWrapper}>
      {showModal && <ModalCancel setShowModal={setShowModal} />}
      {
        !preview
          ? <div className={`${Style.imgUpload} ${postDogIsFetching ? Style.fetching : ''}`}>
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
            <div
              type='button'
              className={'btnprimario'}
              onClick={() => setShowModal(!showModal)}>
              CANCELAR
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
                  className={'btnprimario'}
                  onClick={handleVoucher}>
                  CONFIRMED
                </button>
              </Link>
            </div>

      }
      {dragActive && <div className={Style.dragImgElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
    </div>
  )
}

export default ModalVoucher


// onClick={handleDelete}