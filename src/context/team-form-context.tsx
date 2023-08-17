import { PropsWithChildren, createContext } from 'react'
import { IFormContextParams } from '../types/context-params'
import { useForm } from 'react-hook-form'
import { defaultTeamForm } from '../helpers/context-default-values'
import { ITeam } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { TeamSchema } from '../helpers/validation/team-validator'

export const TeamContext = createContext<IFormContextParams<ITeam> | null>(null)

export const TeamContextProvider = ({ children }: PropsWithChildren) => {
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setValue,
        setError,
        clearErrors,
        setFocus,
        formState,
        reset
    } = useForm<ITeam>({
        mode: 'onChange',
        defaultValues: defaultTeamForm,
        resolver: zodResolver(TeamSchema),
        shouldFocusError: true
    },
    )

    return (
        <TeamContext.Provider value={{
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
        </ TeamContext.Provider >
    )
}