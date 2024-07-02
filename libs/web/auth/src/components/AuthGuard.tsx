import { Navigate } from '@cinestia/web/router'
import React from 'react'
import { AuthService } from '../services/AuthService'
import { toast } from 'react-toastify'

type AuthGuardProps = {
  adminOnly?: boolean
  children: React.ReactNode
}

export const AuthGuard: React.FC<AuthGuardProps> = (props) => {

  if (!AuthService.isLogged()) {
    toast.error('Vous devez être connecté pour accéder à cette page', { toastId: 'auth-guard' })
    return <Navigate to="/auth/login" />
  }
  else if (props.adminOnly && !AuthService.isAdmin()) {
    toast.error('Vous n\'avez pas les droits nécessaires pour accéder à cette page', { toastId: 'admin-guard' })
    return <Navigate to="/" />
  }
  else return props.children
}
