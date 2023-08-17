import { FormState, UseFormClearErrors, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetError, UseFormSetFocus, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'

// -----------------------FORMS----------------------------------
export type IFormContextParams<T> = {
    register: UseFormRegister<T>
    handleSubmit: UseFormHandleSubmit<T, undefined>
    watch: UseFormWatch<T>
    trigger: UseFormTrigger<T>
    setValue: UseFormSetValue<T>
    setError: UseFormSetError<T>
    setFocus: UseFormSetFocus<T>
    formState: FormState<T>,
    reset: UseFormReset<T>
    clearErrors: UseFormClearErrors<ITeam>
}

// ----------------------STATUS-----------------------------------
export type IStatus = {
    activeMessage: boolean
    message: string
    kind: 'success' | 'warning' | 'error'
}

export type StatusParams = {
    status: IStatus
    setStatus: Dispatch<SetStateAction<IStatus>>
}

// -----------------------AUTH------------------------------------
export type AuthState = {
    token: string | null
    rol: string | null
}

// -----------------------RELIABLE PERFORMANCE------------------------------------
export type RelPerfState = {
    currentPerformance: string
}

// -----------------------------------------------------------
export type ActionTypes<T, U> = {
    type: T,
    payload?: U
}

export type IDispatcherContextParams<T, U> = {
    state: T
    dispatch: Dispatch<U>
}