import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { API } from '../../../App'
import { axiosCANCELTicket } from '../../../Slice/transaction/TransactionSlice'
import Modal from '../Modal'
import Style from './ModalCancel.module.css'


const ModalCancel = ({ setShowModal }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [flag, setFlag] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
 
  useEffect(() => {
    const getTransaction = async () => {
      setLoading(true)
      setError(false)
      try {
        console.log(axios.defaults.headers.common)
        const res = await API.get('/transaction/' + `${id}`)
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

  console.log(id, 'soy el id')

  const handleDelete = () => {
    dispatch(axiosCANCELTicket(id))   
  }

  
  const handleFlag = () => {
    setFlag(true)
  }

  console.log(data)

  return (
    <Modal setShowModal={setShowModal}>
      <div>
        <h2>Realmente desea cancelar la compra?</h2>
        <button  type='button'  onClick={() => setShowModal(false)} className={Style.butonCancel}>No</button>
        <Link className={flag ? 'no-visibility' : Style.butonYes} to=''>
          <button type='button' className={flag ? 'no-visibility' : Style.butonYes} onClick={handleFlag}>Yes</button>
        </Link>

        <Link className={flag ? Style.butonAcept : 'no-visibility'} to='/'>
          <button  type='button'  className={flag ? Style.butonAcept : 'no-visibility'} onClick={handleDelete} >Aceptar</button>
        </Link>

      </div>
    </Modal>
  )
}

export default ModalCancel
