import { AuthService } from '@cinestia/web/auth'
import { Navigate } from '@cinestia/web/router'
import React, { useEffect } from 'react'

const LogoutPage: React.FC = () => {

  useEffect(() => {
    AuthService.logout(true, false)
  }, [])

  return <Navigate to='/' />
}

export default LogoutPage
