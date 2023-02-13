import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API } from '../../App';
import { setTransaction } from '../../Slice/transaction/TransactionVoucher';
import Style from './ModalVoucher.module.css'

const ModalVoucher = () => {

  const {id} = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getTransaction = async () => {
      setLoading(true)
      setError(false)
      try {
        console.log(API.defaults.headers.common)
        const res = await API.get(`/transaction/${id}`)
        console.log(res.config.headers)
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

  if(loading) return <h1>Loading..</h1>
  if(error) return <h1>{error.msg ? error.msg : 'error'}.</h1>
  console.log(data)

  return (
    data &&
    <div>
      <p>{data.id}</p>
      <p>{data.status}</p>
      <p>{data.event?.name}</p>
      <p>{data.buyer?.name}</p>
    </div>
  )
}

export default ModalVoucher