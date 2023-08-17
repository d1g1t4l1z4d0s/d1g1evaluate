import { useMutation, useQuery } from "react-query"
import { useNavigate } from 'react-router-dom'
import { ITeam } from "../types"
import { AxiosError } from "axios"
import { deleteTeam, fetchTeam, fetchTeams, patchTeam, postTeam } from "../services/teamOperations"
import { useContext } from "react"
import { TeamContext } from "../context/team-form-context"
import { useAuthContext } from "./user-operations"
import { tokenError } from "../helpers/check-authentication-actions"
import { useStatusContext } from "./action-status"

export const useTeamContext = () => {
    const context = useContext(TeamContext);
    if (!context) throw new Error('useTeamContext must be used inside an TeamContextProvider');
    return context;
}

export const useFetchTeams = (leagueId: string) => {
    const { state: { token }, dispatch } = useAuthContext()
    const { setStatus } = useStatusContext()
    const navigate = useNavigate()
    return useQuery<ITeam[], AxiosError>({
        queryKey: ['league-compare', leagueId],
        queryFn: () => fetchTeams({ token: token as string, leagueId }),
        enabled: !!leagueId,
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

export const useFetchTeam = ({ leagueId, teamId }: { leagueId: string, teamId: string }) => {
    const { reset } = useTeamContext()
    const { state: { token }, dispatch } = useAuthContext()
    const { setStatus } = useStatusContext()
    const navigate = useNavigate()

    return useQuery<ITeam, AxiosError>({
        queryKey: ['team', teamId],
        queryFn: () => fetchTeam({ token: token as string, leagueId, teamId }),
        enabled: !!teamId,
        onSuccess: ({
            teamId,
            name,
            manager,
            logo,
            stats: {
                scoredGoals,
                goalsAgainst,
                goalBalance,
                matches,
                wins,
                draws,
                losses,
                pointsAverage,
                yellowCards,
                redCards,
                reliablePerformance: {
                    goalkeeper: {
                        name: goalkeeperName,
                        caughtBalls,
                        concededGoals,
                        cleanSheets,
                    },
                    lowBlock: {
                        name: lowBlockName,
                        behavior,
                        tackles
                    },
                    midBlock: {
                        name: midBlockName,
                        assists,
                        completedPasses
                    },
                    highBlock: {
                        name: highBlockName,
                        scoredGoals: hbScoredGoals,
                        shotsOnTarget
                    }
                }
            } }) => {
            reset({
                teamId,
                name,
                manager,
                logo,
                stats: {
                    scoredGoals,
                    goalsAgainst,
                    goalBalance,
                    matches,
                    wins,
                    draws,
                    losses,
                    pointsAverage,
                    yellowCards,
                    redCards,
                    reliablePerformance: {
                        goalkeeper: {
                            name: goalkeeperName,
                            caughtBalls,
                            cleanSheets,
                            concededGoals
                        },
                        lowBlock: {
                            name: lowBlockName,
                            behavior,
                            tackles
                        },
                        midBlock: {
                            name: midBlockName,
                            assists,
                            completedPasses
                        },
                        highBlock: {
                            name: highBlockName,
                            scoredGoals: hbScoredGoals,
                            shotsOnTarget
                        }
                    }
                }
            })

        },
        refetchOnWindowFocus: false,
        onError: err => {
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

export const usePostTeam = () => {
    const { dispatch } = useAuthContext()
    const { setStatus } = useStatusContext()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: postTeam,
        onSuccess: ({ data }) => {
            navigate(-1)
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

export const usePatchTeam = () => {
    const { dispatch } = useAuthContext()
    const { setStatus } = useStatusContext()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: patchTeam,
        onSuccess: ({ data }) => {
            navigate(-1)
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

export const useDeleteTeam = () => {
    const { dispatch } = useAuthContext()
    const { setStatus } = useStatusContext()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: deleteTeam,
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