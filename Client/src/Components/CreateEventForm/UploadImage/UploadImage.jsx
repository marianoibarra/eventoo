import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useRef, useEffect} from 'react'
import { useSelector } from 'react-redux';
import styles from './UploadImage.module.css'

function UploadImage({input, setInput}) {

    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(false)
    const refInputImg = useRef()
    const postDogIsFetching = useSelector(state => state.postDogIsFetching)
    const [imgIsFetching, setImgIsFetching] = useState(false)

    useEffect(() => {
        if (input.cover_pic) {
          setPreview(input.cover_pic);
        }
      }, [input.cover_pic]);
    
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
        if (e.dataTransfer.files && e.dataTransfer.files[0] && e.dataTransfer.files[0].type.startsWith('image/')) {
            handleFiles(e.dataTransfer.files[0]);
        }
      };

    const handleDelete = () => {
        setInput({
            ...input,
            image: ''
        })
        setPreview(false)
    }

    const handleFiles = (file) => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) { 
        var rawLog = reader.result.split(',')[1];
        var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
        setPreview(URL.createObjectURL(file))
        setImgIsFetching(true)
        fetch('https://script.google.com/macros/s/AKfycbyWX3EdWONKc_LefdFUP2aGTRx82xEBE0kiaCMb-Tmos8kUHuNs1vcpzKioYpXOQuDV/exec', //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend)})
            .then(res => res.json()).then(res => {
                setInput({
                    ...input,
                    cover_pic: res.url
                })
                setImgIsFetching(false)
            }).catch(e => console.log(e))
        }
    }

    useEffect(() => {
        if(input.image === null) setPreview(undefined)
      }, [input])



  return (
    <div onDragEnter={handleDrag} className={styles.imageWrapper}>
        {
            !preview
                ?   <div className={`${styles.imgUpload} ${postDogIsFetching ? styles.fetching : ''}`}>
                        <input
                            hidden
                            id="imgInput"
                            type="file"
                            accept="image/*"
                            ref={refInputImg}
                            onChange={(e) => handleFiles(e.target.files[0])}
                        />
                        <label className={styles.imgDropArea} htmlFor="imgInput">
                            {!dragActive
                                ?   <div className={styles.defaultDropArea}>
                                        <p className={styles.text}>Drag and drop a photo here</p>
                                        <p className={styles.text}>or</p>
                                        <button
                                            type='button'
                                            className={styles.uploadButton}
                                            onClick={() => refInputImg.current.click()}
                                        >
                                            Upload a photo
                                        </button>
                                    </div>
                                :   <div className={styles.onDragDropArea}>
                                        Drop your photo here
                                    </div>
                            }
                        </label>
                    </div>
                :   imgIsFetching 
                        ?   <div style={{backgroundImage: `url(${preview})`}} className={styles.imgFetchingWrapper}>
                                <div className={styles.uploadMsg}>Uploading photo..</div>
                            </div>
                        :   <div className={styles.imgPreviewWrappper}>
                                <button type='button' className={styles.deleteImg} onClick={handleDelete} >
                                    <FontAwesomeIcon icon={faXmark} size='xl' />
                                </button>
                                <img className={styles.imgPreview} src={preview} />
                            </div>
                        
        }
        { dragActive && <div className={styles.dragImgElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </div>
  )
}

export default UploadImage