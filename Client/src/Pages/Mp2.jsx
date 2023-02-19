import React, { useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { API } from '../App';

const Mp2= () => {

  const {eventId} = useParams()
  const queries = useLocation().search
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.post(`http://localhost:3001/mercadopago/create${queries}`, {
          eventId
        })
        console.log(res)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetch()
  }, [])
  return (
    <div>
        MP2
    </div>
  )
}

export default Mp2