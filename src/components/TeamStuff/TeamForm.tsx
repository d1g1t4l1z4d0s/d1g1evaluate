import { useEffect, useState } from 'react'
import { SubmitHandler } from "react-hook-form"
import { ITeam } from '../../types'
import { UseMutateFunction } from 'react-query'
import { defaultTeamForm } from '../../helpers/context-default-values'
import { useAuthContext } from '../../hooks/user-operations'
import { useTeamContext } from '../../hooks/team-operations'
import { Response } from '../../types/services-params'
import { AxiosError } from 'axios'
import { useStatusContext } from '../../hooks/action-status'
import Message from '../GeneralStuff/Message'
import EntityFields from './FormComplementer/EntityFields'
import StatFields from './FormComplementer/StatFields'
import GoalkeeperFields from './FormComplementer/GoalkeeperFields'
import LowBlockFields from './FormComplementer/LowBlockFields'
import MidBlockFields from './FormComplementer/MidBlockFields'
import HighBlockFields from './FormComplementer/HighBlockFields'
import TeamFormTitles from './TeamFormTitles'
import './TeamForm.css'

type TeamFormProps = {
    leagueId: string
    teamId?: string
    mode: 'post' | 'patch'
    mutate: UseMutateFunction<Response<string>, AxiosError<unknown, any>,
        {
            token: string;
            leagueId: string;
            teamId?: string | undefined;
            body: ITeam;
        }, unknown>
}

export default function TeamForm({ leagueId, teamId, mode, mutate }: TeamFormProps) {
    const [isEntityFields] = useState(true)
    const [isStatFields, setIsStatFields] = useState(false)
    const [isGoalkeeperFields, setIsGoalkeeperFields] = useState(false)
    const [isLowBlockFields, setIsLowBlockFields] = useState(false)
    const [isMidBlockFields, setIsMidBlockFields] = useState(false)
    const [isHighBlockFields, setIsHighBlockFields] = useState(false)

    const {
        reset,
        handleSubmit,
        formState: { errors }
    } = useTeamContext()
    const { setStatus } = useStatusContext()
    const { state: { token } } = useAuthContext()

    useEffect(() => {
        if (mode === 'post') reset(defaultTeamForm)
    }, [mode, reset])

    const checkBackError = () => {
        if (Object.keys(errors).length > 0) setStatus({
            activeMessage: true,
            message: 'Please, check back all the fields to be ensured that they all satisfy the validations',
            kind: 'warning'
        })
    }

    const onSubmit: SubmitHandler<ITeam> = data => {

        mode === 'patch'
            ? mutate({ token: token as string, leagueId, teamId, body: data })
            : mutate({ token: token as string, leagueId, body: data })
    }

    return (
        <>
            <TeamFormTitles
                isEntityFields={isEntityFields}
                isStatFields={isStatFields}
                isGoalkeeperFields={isGoalkeeperFields}
                isLowBlockFields={isLowBlockFields}
                isMidBlockFields={isMidBlockFields}
                isHighBlockFields={isHighBlockFields}
            />
            <p>*FA: Filled automatically, no need to touch these fields</p>

            <form className='team-form' onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
                {(isEntityFields && !isStatFields) && <div className='entity'>
                    <EntityFields mode={mode} />
                    {!(errors.teamId || errors.name || errors.manager || errors.logo)
                        ? <button className='button' onClick={() => setIsStatFields(true)} >Next</button>
                        : <Message text='Check point error to continue, please' kind='warning' />}

                </div>}

                {(isStatFields && !isGoalkeeperFields) && <div className='stats'>
                    <StatFields />
                    {!(errors.stats?.scoredGoals || errors.stats?.goalsAgainst || errors.stats?.matches || errors.stats?.wins || errors.stats?.draws || errors.stats?.losses || errors.stats?.yellowCards || errors.stats?.redCards)
                        ? <div className='control-buttons-container'>
                            <button className='button' onClick={() => setIsStatFields(false)}>Back</button>
                            <button className='button' onClick={() => setIsGoalkeeperFields(true)}>Next</button>
                        </div>
                        : <Message text='Check point error to continue, please' kind='warning' />}
                </div>}

                {(isGoalkeeperFields && !isLowBlockFields) && <div className='goalkeeper'>
                    <GoalkeeperFields />
                    {!(errors.stats?.reliablePerformance?.goalkeeper?.name || errors.stats?.reliablePerformance?.goalkeeper?.caughtBalls || errors.stats?.reliablePerformance?.goalkeeper?.cleanSheets || errors.stats?.reliablePerformance?.goalkeeper?.concededGoals)
                        ? <div className='control-buttons-container'>
                            <button className='button' onClick={() => setIsGoalkeeperFields(false)}>Back</button>
                            <button className='button' onClick={() => setIsLowBlockFields(true)}>Next</button>
                        </div>
                        : <Message text='Check point error to continue, please' kind='warning' />}
                </div>}

                {(isLowBlockFields && !isMidBlockFields) && <div className='low-block'>
                    <LowBlockFields />
                    {!(errors.stats?.reliablePerformance?.lowBlock?.name || errors.stats?.reliablePerformance?.lowBlock?.behavior || errors.stats?.reliablePerformance?.lowBlock?.tackles)
                        ? <div className='control-buttons-container'>
                            <button className='button' onClick={() => setIsLowBlockFields(false)}>Back</button>
                            <button className='button' onClick={() => setIsMidBlockFields(true)}>Next</button>
                        </div>
                        : <Message text='Check point error to continue, please' kind='warning' />}
                </div>}

                {(isMidBlockFields && !isHighBlockFields) && <div className='mid-block'>
                    <MidBlockFields />
                    {!(errors.stats?.reliablePerformance?.midBlock?.name || errors.stats?.reliablePerformance?.midBlock?.assists || errors.stats?.reliablePerformance?.midBlock?.completedPasses)
                        ? <div className='control-buttons-container'>
                            <button className='button' onClick={() => setIsMidBlockFields(false)}>Back</button>
                            <button className='button' onClick={() => setIsHighBlockFields(true)}>Next</button>
                        </div>
                        : <Message text='Check point error to continue, please' kind='warning' />}
                </div>}

                {isHighBlockFields && <div className='high-block'>
                    <HighBlockFields />
                    {!(errors.stats?.reliablePerformance?.highBlock?.name || errors.stats?.reliablePerformance?.highBlock?.scoredGoals || errors.stats?.reliablePerformance?.highBlock?.shotsOnTarget)
                        ? <div className='control-buttons-container'>
                            <button className='button' onClick={() => setIsHighBlockFields(false)}>Back</button>
                            <input type="submit" className="button" onClick={checkBackError} value="Send" />
                        </div>
                        : <Message text='Check point error to continue, please' kind='warning' />}
                </div>}
            </form>
        </>
    )
}