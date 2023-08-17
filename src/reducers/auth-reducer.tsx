import { AUTH_TYPES } from "../helpers/context-dispatcher-enums"
import { ActionTypes, AuthState } from "../types/context-params"

export type AuthActionTypes = ActionTypes<AUTH_TYPES, AuthState>

export const authReducer = (state: AuthState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case AUTH_TYPES.LOGIN: return { ...action.payload as AuthState }
        case AUTH_TYPES.LOGOUT: {
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_rol')
            return { token: null, rol: null }
        }
        default: return state
    }
}