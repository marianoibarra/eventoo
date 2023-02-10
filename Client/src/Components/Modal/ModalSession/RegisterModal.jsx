import React, { useContext } from 'react'
import { SessionContext } from '../../../App'

const RegisterModal = () => {
    const {setShowSessionModal} = useContext(SessionContext)
  return (
    <div>
      RegisterModal
      <button onClick={() => setShowSessionModal('login')}>Login</button>
      <button onClick={() => setShowSessionModal('forgotPassword')}>forgot</button>
    </div>
  )
}

export default RegisterModal