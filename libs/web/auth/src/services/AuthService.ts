import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from '@cinestia/api/auth'

export type AuthEvents = {
	login: string
	logout: void
}

export enum Items {
	Token = 'token',
}

export class AuthService {

	public static login(token: string, showToast = true) {
		localStorage.setItem(Items.Token, token)
		if (showToast) toast.success('Vous êtes connecté', { toastId: 'login' })
	}

	public static logout(showToast = true, redirect = true) {
		localStorage.removeItem(Items.Token)
		if (showToast) toast.error('Vous avez été déconnecté', { toastId: 'logout' })
		if (redirect) window.location.href = '/auth/login'
	}

	public static getToken() {
		return localStorage.getItem(Items.Token)
	}

	public static getPayload() {
		const token = this.getToken()
		if (!token) return null
		return jwtDecode<JwtPayload>(token)
	}

	public static isLogged() {
		return !!localStorage.getItem(Items.Token)
	}

	public static isAdmin() {
		return this.getRole() === 'admin'
	}

	public static getRole() {
		return this.getPayload()?.role
	}

	public static isTokenValid() {
		const payload = this.getPayload()
		if (!payload) return false
		return (payload as any).exp * 1000 > Date.now()
	}
}
