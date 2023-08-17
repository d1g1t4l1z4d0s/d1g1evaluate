import { NavigateFunction } from "react-router-dom"
import { AUTH_TYPES } from "./context-dispatcher-enums"
import { Dispatch } from "react"
import { AuthActionTypes } from "../reducers/auth-reducer"

export const tokenError = ({ navigate, dispatch }: { navigate: NavigateFunction, dispatch: Dispatch<AuthActionTypes> }) => {
    dispatch({ type: AUTH_TYPES.LOGOUT })
    navigate('../login')
}