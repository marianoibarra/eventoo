import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Style from './Voucher.module.css'
import { API } from '../../../../App';
import { axiosPutTicket, axiosCANCELTicket } from '../../../../Slice/transaction/TransactionSlice';
import { Document, Page } from 'react-pdf'
import pdfjsLib from 'pdfjs-dist'

const Voucher = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(false)
<<<<<<< Updated upstream
  const [imgIsFetching, setImgIsFetching] = useState(false)
  const [pdfIsFetching, setpdfIsFetching] = useState(null)
  const [accepted, setAccepted] = useState(false);
  const { eventDetail } = useSelector(state => state.eventDetail);
=======
  const [fileIsFetching, setfileIsFetching] = useState(false)
  const [urlFile, seturlFile] = useState(null)
  const [imgDocument, setImgDocument] = useState(null)
  const [pdfDocument, setPdfDocument] = useState(null)
  const [accepted, setAccepted] = useState(true);
>>>>>>> Stashed changes
  const { email } = useSelector(state => state.user)
  const refInputImg = useRef()
  const dataTransaction = useSelector(state => state.transaction)
  const id = dataTransaction?.transaction?.id
  const canvasRef = useRef(null)



  // useEffect para cargar la informacion que viene por API
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
          setError(error)
          setLoading(false)
        }
      }
    }
    getTransaction()
  }, [id]);



  //useEffect que instanciar el urlFile, para hacer un put en el handle
  useEffect(() => {
    if (pdfDocument) {
      const url = pdfDocument.replace("view", "download");
      console.log(url)
      seturlFile(pdfDocument)
    } else if (imgDocument) {
      seturlFile(imgDocument)
    }
  }, [pdfDocument, imgDocument])


  //handle que realiza el dispatch, de la url
  const handleAccept = () => {
    const objUrlFile = {
      payment_proof: urlFile
    }
    dispatch(axiosPutTicket({ id, objUrlFile }))
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

  console.log(pdfDocument, 'soy la url del PDF')

  const handleFiles = (file) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      var rawLog = reader.result.split(',')[1];
<<<<<<< Updated upstream
      var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
      setPreview(URL.createObjectURL(file))
      setImgIsFetching(true)
      fetch('https://script.google.com/macros/s/AKfycbxU47iTlWQkocTIWS_Wr_fO_U7zqLuQE3jF7QTMeChKn-d2KrNdOLrCsFerZeS50W_2Ow/exec', //your AppsScript URL
        { method: "POST", body: JSON.stringify(dataSend) })
        .then(res => res.json()).then(res => {
          setpdfIsFetching(res.url)
          setImgIsFetching(false)
        }).catch(e => console.log(e))
=======
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
          { method: "POST", body: JSON.stringify(dataSend) })
          .then(res => res.json()).then(res => {
            setPdfDocument(res.url)
            setfileIsFetching(false)
            setAccepted(!accepted);
          }).catch(e => console.log(e))
      }
>>>>>>> Stashed changes
    }
  }



  // useEffect(()=>{    
  //   if(pdfDocument){
  //     pdfjsLib.getDocument(pdfDocument).promise
  //     .then(function(pdf){
  //       pdf.getPage(1)
  //       .then(function(page){
  //         const viewport= page.getViewport({scale:1});
  //         const canvas = canvasRef.current;
  //         const context= canvas.getContext('2d');
  //         canvas.width=viewport.width;
  //         canvas.height=viewport.height;
  //         const renderContext={
  //           canvasContext: context,
  //           viewport: viewport
  //         }
  //         page.render(renderContext)
  //       })
  //     })
  //   }
  // },[pdfDocument])

  const handleDelete = () => {
    dispatch(axiosCANCELTicket(id))
    navigate(0)
  }

<<<<<<< Updated upstream
  const handleAccept = () => {
    setAccepted(true);
  };

=======
>>>>>>> Stashed changes

  return (
    data &&
    <div onDragEnter={handleDrag} className={Style.imageWrapper}>

      <h1 className={Style.containerVoucher_tittle}>Operacion de pedido <p>{id?.slice(0, 8)}</p></h1>
      <h2 className={Style.containerVoucher_subTittle}><p>del usuario</p> {email}</h2>

      {
        !preview && id
          ?
          <div className={Style.containerVoucher}>
<<<<<<< Updated upstream
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
=======
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
          </div>

          : fileIsFetching
            ?
            <div className={Style.uploadMsg}>
              <h2>Cargando comprobante</h2>
              <h3>Aguarde por favor</h3>
              <div className={Style.spinner}><div></div><div></div><div></div><div></div></div>
>>>>>>> Stashed changes
            </div>

            : imgDocument
              ?
              <div className={Style.imgPreviewWrappper}>
                <img className={Style.imgPreview} style={{ backgroundImage: `url(${preview})` }} />
              </div>
              :
              <div className={Style.imgPreviewWrappper}>
                <Document file={pdfDocument} className={Style.imgPreviewWrappper}>
                  <Page pageNumber={1} />
                </Document>
              </div>


      }
<<<<<<< Updated upstream
=======

      <div className={Style.containerVoucher_button}>
        <button
          type='button'
          className={'btnprimario'}
          onClick={handleDelete}>
          CANCELAR
        </button>

        <button
          type='button'
          className={accepted ? Style.btnAceptar : 'btnprimario'}
          disabled={accepted}
          onClick={handleAccept}>
          ACEPTAR
        </button>
      </div>
>>>>>>> Stashed changes
      {dragActive && <div className={Style.dragImgElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
    </div>
  )
}

export default Voucher

<<<<<<< Updated upstream


=======
>>>>>>> Stashed changes
