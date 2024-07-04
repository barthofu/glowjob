import mitt from 'mitt'
import { toast } from 'react-toastify'

export type AuthEvents = {
    login: string
    logout: void
}

export enum Items {
    Token = 'token',
}

export class AuthService {

    static emitter = mitt<AuthEvents>()

    public static login(token: string, showToast = true) {
        localStorage.setItem(Items.Token, token)
        if (showToast) toast.success('Vous êtes connecté', { toastId: 'login' })
        this.emitter.emit('login', token)
    }

    public static logout(showToast = true) {
        localStorage.removeItem(Items.Token)
        if (showToast) toast.error('Vous avez été déconnecté', { toastId: 'logout' })
        this.emitter.emit('logout')
    }

    public static getToken() {
        return localStorage.getItem(Items.Token)
    }
} 