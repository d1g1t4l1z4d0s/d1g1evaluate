import { createContext, useEffect, PropsWithChildren, useReducer } from 'react';
import { AuthState, IDispatcherContextParams } from '../types/context-params';
import { AUTH_TYPES } from '../helpers/context-dispatcher-enums';
import { AuthActionTypes, authReducer } from '../reducers/auth-reducer';

const authInitialState: AuthState = {
    token: null,
    rol: null
}

export const AuthContext = createContext<IDispatcherContextParams<AuthState, AuthActionTypes>>({
    state: authInitialState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch: () => { }
})

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState)

    useEffect(() => {
        const token = localStorage.getItem('user_token')
        const rol = localStorage.getItem('user_rol')
        if (token && rol) dispatch({ type: AUTH_TYPES.LOGIN, payload: { token, rol } })
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>)
}