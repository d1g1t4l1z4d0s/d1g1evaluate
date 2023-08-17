import { PropsWithChildren, createContext } from 'react'
import { useForm } from 'react-hook-form'
import { ILeague } from '../types'
import { IFormContextParams } from '../types/context-params'
import { defaultLeagueForm } from '../helpers/context-default-values'
import { zodResolver } from '@hookform/resolvers/zod'
import { LeagueSchema } from '../helpers/validation/league-validator'

export const LeagueContext = createContext<IFormContextParams<Omit<ILeague, '_id' | 'teams'>> | null>(null)

export const LeagueContextProvider = ({ children }: PropsWithChildren) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        setFocus,
        trigger,
        clearErrors,
        formState,
        reset
    } = useForm<Omit<ILeague, '_id' | 'teams'>>({
        mode: 'onChange',
        defaultValues: defaultLeagueForm,
        resolver: zodResolver(LeagueSchema),
        shouldFocusError: true
    })

    return (
        <LeagueContext.Provider value={{
            register,
            handleSubmit,
            watch,
            trigger,
            setValue,
            setError,
            setFocus,
            formState,
            reset,
            clearErrors
        }}>
            {children}
        </ LeagueContext.Provider >
    )
}