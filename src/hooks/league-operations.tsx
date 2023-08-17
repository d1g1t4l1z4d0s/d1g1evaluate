import { useMutation, useQuery } from "react-query"
import { useContext } from 'react'
import { ILeague } from "../types"
import { AxiosError } from "axios"
import { LeagueContext } from "../context/league-form-context"
import { fetchLeagues, fetchLeague, patchLeague, postLeague, deleteLeague } from '../services/leagueOperations'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./user-operations"
import { tokenError } from "../helpers/check-authentication-actions"
import { useStatusContext } from "./action-status"

export const useLeagueContext = () => {
    const context = useContext(LeagueContext);
    if (!context) throw new Error('useLeagueContext must be used inside an LeagueContextProvider');
    return context;
}

export const useFetchLeagues = () => {
    const { setStatus } = useStatusContext()
    const { state: { token }, dispatch } = useAuthContext()
    const navigate = useNavigate()

    return useQuery<ILeague[], AxiosError>({
        queryKey: 'leagues',
        queryFn: () => fetchLeagues(token as string),
        refetchOnWindowFocus: false,
        onError: (err) => {
            const response = err.response?.data as { error: string }
            if (response.error === 'Token expired' || response.error === 'Token error') tokenError({ navigate, dispatch })
            setStatus({
                activeMessage: true,
                message: response.error,
                kind: 'error'
            })
        }
    })
}

export const useFetchLeague = (leagueId: string) => {
    const { reset } = useLeagueContext()
    const { state: { token }, dispatch } = useAuthContext()
    const { setStatus } = useStatusContext()
    const navigate = useNavigate()

    return useQuery<ILeague, AxiosError>({
        queryKey: ['league-administration', leagueId],
        queryFn: () => fetchLeague({ token: token as string, leagueId }),
        onSuccess: ({ name, logo, currentChampion }) => {
            reset({ name, logo, currentChampion })
        },
        onError: (err) => {
            const response = err.response?.data as { error: string }
            if (response.error === 'Token expired' || response.error === 'Token error') tokenError({ navigate, dispatch })
            setStatus({
                activeMessage: true,
                message: response.error,
                kind: 'error'
            })
        }
    })
}

export const usePostLeague = () => {
    const { dispatch } = useAuthContext()
    const { setStatus } = useStatusContext()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: postLeague,
        onSuccess: ({ data }) => {
            setStatus({
                activeMessage: true,
                message: data,
                kind: 'success'
            })
        },
        onError: (err: AxiosError, { body: { name } }) => {
            const response = err.response?.data as { error: string }
            if (response.error === 'Token expired' || response.error === 'Token error') tokenError({ navigate, dispatch })
            if (response.error.includes('E11000')) response.error = `${name} already exists`
            setStatus({
                activeMessage: true,
                message: response.error,
                kind: 'error'
            })
        }
    })
}

export const usePatchLeague = () => {
    const { dispatch } = useAuthContext()
    const { setStatus } = useStatusContext()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: patchLeague,
        onSuccess: ({ data }) => {
            setStatus({
                activeMessage: true,
                message: data,
                kind: 'success'
            })
        },
        onError: (err: AxiosError) => {
            const response = err.response?.data as { error: string }
            if (response.error === 'Token expired' || response.error === 'Token error') tokenError({ navigate, dispatch })
            setStatus({
                activeMessage: true,
                message: response.error,
                kind: 'error'
            })
        }
    })
}

export const useDeleteLeague = () => {
    const { dispatch } = useAuthContext()
    const { setStatus } = useStatusContext()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: deleteLeague,
        onSuccess: ({ data }) => {
            setStatus({
                activeMessage: true,
                message: data,
                kind: 'success'
            })
        },
        onError: (err: AxiosError) => {
            const response = err.response?.data as { error: string }
            if (response.error === 'Token expired' || response.error === 'Token error') tokenError({ navigate, dispatch })
            setStatus({
                activeMessage: true,
                message: response.error,
                kind: 'error'
            })
        }
    })
}