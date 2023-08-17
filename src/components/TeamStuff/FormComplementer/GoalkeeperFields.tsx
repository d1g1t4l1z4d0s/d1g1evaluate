import { FocusEvent, useCallback } from 'react'
import { useTeamContext } from '../../../hooks/team-operations'
import Message from '../../GeneralStuff/Message'

export default function GoalkeeperFields() {
    const { watch, register, formState: { errors }, setError } = useTeamContext()
    const goalsAgainst = watch('stats.goalsAgainst')
    const matches = watch('stats.matches')

    const concededGoalsValidation = useCallback((e: FocusEvent<HTMLInputElement>) => {
        const { value } = e.target
        const valueAsNumber = Number.parseInt(value)
        if (valueAsNumber > goalsAgainst) setError(
            'stats.reliablePerformance.goalkeeper.concededGoals',
            {
                type: 'manual',
                message: `A goalkeeper can't concede more goals than total received `
            }
        )
    }, [goalsAgainst, setError])

    const cleanSheetsValidation = useCallback((e: FocusEvent<HTMLInputElement>) => {
        const { value } = e.target
        const valueAsNumber = Number.parseInt(value)
        if (valueAsNumber > matches) setError(
            'stats.reliablePerformance.goalkeeper.cleanSheets',
            {
                type: 'manual',
                message: `A goalkeeper must not have more clean sheets to played matches`
            }
        )
    }, [matches, setError])

    return (
        <>
            <div className="form-group">
                <label htmlFor="gk-name">Name</label>
                <input
                    type="text"
                    {...register('stats.reliablePerformance.goalkeeper.name',
                        { required: true })}
                    id="gk-name" />
                {errors?.stats?.reliablePerformance?.goalkeeper?.name &&
                    <Message text={errors.stats?.reliablePerformance?.goalkeeper?.name.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="caught-balls">Caught balls</label>
                <input
                    type="number"
                    {...register('stats.reliablePerformance.goalkeeper.caughtBalls',
                        { valueAsNumber: true, required: true })}
                    id="caught-balls"
                    min={0} />
                {errors?.stats?.reliablePerformance?.goalkeeper?.caughtBalls &&
                    <Message text={errors.stats?.reliablePerformance?.goalkeeper?.caughtBalls.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="clean-sheets">Clean sheets</label>
                <input
                    type="number"
                    {...register('stats.reliablePerformance.goalkeeper.cleanSheets',
                        { valueAsNumber: true, onBlur: cleanSheetsValidation, required: true })}
                    id="clean-sheets"
                    min={0} />
                {errors?.stats?.reliablePerformance?.goalkeeper?.cleanSheets &&
                    <Message text={errors.stats?.reliablePerformance?.goalkeeper?.cleanSheets.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="conceded-goals">Conceded goals</label>
                <input
                    type="number"
                    {...register('stats.reliablePerformance.goalkeeper.concededGoals',
                        { valueAsNumber: true, onBlur: concededGoalsValidation, required: true })}
                    id="conceded-goals"
                    min={0} />
                {errors?.stats?.reliablePerformance?.goalkeeper?.concededGoals &&
                    <Message text={errors.stats?.reliablePerformance?.goalkeeper?.concededGoals.message as string} kind='error' />
                }
            </div>
        </>
    )
}