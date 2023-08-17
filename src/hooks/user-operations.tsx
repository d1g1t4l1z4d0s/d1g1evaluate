import { useMutation } from "react-query"
import { login, signup } from "../services/userOperations"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth-context"
import { AUTH_TYPES } from "../helpers/context-dispatcher-enums"
import { AxiosError } from "axios"
import { useStatusContext } from "./action-status"

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuthContext must be used inside an AuthContextProvider');
    return context;
}

export const useSignup = () => {
    const { setStatus } = useStatusContext()
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: signup,
        onSuccess: ({ token, rol, username }) => {
            localStorage.setItem('user_token', token)
            localStorage.setItem('user_rol', rol)
            dispatch({ type: AUTH_TYPES.LOGIN, payload: { token, rol } })
            navigate('../compare')
            setStatus({
                activeMessage: true,
                message: `Welcome, ${username}`,
                kind: 'success'
            })
        },
        onError: (err: AxiosError) => {
            const response = err.response?.data as { error: string }
            if (response.error.includes('E11000')) response.error = 'User exists already, pick another username'
            setStatus({
                activeMessage: true,
                message: response.error,
                kind: 'error'
            })
        }
    })
}

export const useLogin = () => {
    const { setStatus } = useStatusContext()
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: login,
        onSuccess: ({ token, rol, username }) => {
            localStorage.setItem('user_token', token)
            localStorage.setItem('user_rol', rol)
            dispatch({ type: AUTH_TYPES.LOGIN, payload: { token, rol } })
            navigate('../compare')
            setStatus({
                activeMessage: true,
                message: `Welcome, ${username}`,
                kind: 'success'
            })
        },
        onError: (err: AxiosError) => {
            const response = err.response?.data as { error: string }
            setStatus({
                activeMessage: true,
                message: response.error,
                kind: 'error'
            })
        }
    })
}