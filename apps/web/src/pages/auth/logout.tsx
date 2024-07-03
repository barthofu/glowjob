import { AuthService, useToken } from '@glowjob/web/auth'
import { Navigate } from '@glowjob/web/router'
import React, { useEffect } from 'react'

const LogoutPage: React.FC = () => {

    const { setToken } = useToken()
    
    useEffect(() => {
        AuthService.logout()
    }, [setToken])

	return <Navigate to='/auth/login' />
}

export default LogoutPage