import { FocusEvent, useCallback } from 'react'
import { useTeamContext } from '../../../hooks/team-operations'
import Message from '../../GeneralStuff/Message'

export default function HighBlockFields() {
    const { watch, register, formState: { errors }, setError } = useTeamContext()
    const scoredGoals = watch('stats.scoredGoals')
    const hbScoredGoals = watch('stats.reliablePerformance.highBlock.scoredGoals')

    const scoredGoalsValidation = useCallback((e: FocusEvent<HTMLInputElement>) => {
        const { value } = e.target
        const valueAsNumber = Number.parseInt(value)
        if (valueAsNumber > scoredGoals) setError(
            'stats.reliablePerformance.highBlock.scoredGoals',
            {
                type: 'manual',
                message: `Goals scored by a player cannot be more than team's total goals`
            }
        )
    }, [scoredGoals, setError])

    const shotsOnTargetValidation = useCallback((e: FocusEvent<HTMLInputElement>) => {
        const { value } = e.target
        const valueAsNumber = Number.parseInt(value)
        if (hbScoredGoals > valueAsNumber) setError(
            'stats.reliablePerformance.highBlock.shotsOnTarget',
            {
                type: 'manual',
                message: `Scored goals by a player can't be greater than shot on target`
            }
        )
    }, [hbScoredGoals, setError])

    return (
        <>
            <div className="form-group">
                <label htmlFor="hb-name">Name</label>
                <input
                    type="text"
                    {...register('stats.reliablePerformance.highBlock.name',
                        { required: true })}
                    id="hb-name" />
                {errors.stats?.reliablePerformance?.highBlock?.name &&
                    <Message text={errors.stats?.reliablePerformance?.highBlock?.name.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="hb-scored-goals">Scored goals</label>
                <input
                    type="number"
                    {...register('stats.reliablePerformance.highBlock.scoredGoals',
                        { valueAsNumber: true, onBlur: scoredGoalsValidation, required: true })}
                    id="hb-scored-goals"
                    min={0} />
                {errors.stats?.reliablePerformance?.highBlock?.scoredGoals &&
                    <Message text={errors.stats?.reliablePerformance?.highBlock?.scoredGoals.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="shots-on-t-avg">Shots on target</label>
                <input
                    type="number"
                    {...register('stats.reliablePerformance.highBlock.shotsOnTarget',
                        { valueAsNumber: true, onBlur: shotsOnTargetValidation, required: true })}
                    id="shots-on-t-avg"
                    min={0} />
                {errors.stats?.reliablePerformance?.highBlock?.shotsOnTarget &&
                    <Message text={errors.stats?.reliablePerformance?.highBlock?.shotsOnTarget.message as string} kind='error' />
                }
            </div>
        </>
    )
}