import React, { useContext } from 'react'
import { SessionContext } from '../../../'

const ForgotPasswordModal = () => {
  const {setShowSessionModal} = useContext(SessionContext)
  return (
    <div>
      ForgotPasswordModal
      <button onClick={() => setShowSessionModal('login')}>Login</button>
      <button onClick={() => setShowSessionModal('register')}>register</button>
    </div>
  )
}

export default ForgotPasswordModal