import { FocusEvent, useCallback } from 'react'
import { useTeamContext } from '../../../hooks/team-operations'
import Message from '../../GeneralStuff/Message'

export default function MidBlockFields() {
    const { watch, register, formState: { errors }, setError } = useTeamContext()
    const assists = watch('stats.reliablePerformance.midBlock.assists')
    const scoredGoals = watch('stats.scoredGoals')

    const assistsValidation = useCallback((e: FocusEvent<HTMLInputElement>) => {
        const { value } = e.target
        const valueAsNumber = Number.parseInt(value)
        if (valueAsNumber > scoredGoals) setError(
            'stats.reliablePerformance.midBlock.assists',
            {
                type: 'manual',
                message: `Gave assists by a player cannot be more than team's total goals`
            }
        )
    }, [scoredGoals, setError])

    const completedPassesValidation = useCallback((e: FocusEvent<HTMLInputElement>) => {
        const { value } = e.target
        const valueAsNumber = Number.parseInt(value)
        if (assists > valueAsNumber) setError(
            'stats.reliablePerformance.midBlock.completedPasses',
            {
                type: 'manual',
                message: `Gave assists by a player can't be greater than completed passes`
            }
        )
    }, [assists, setError])

    return (
        <>
            <div className="form-group">
                <label htmlFor="mb-name">Name</label>
                <input
                    type="text"
                    {...register('stats.reliablePerformance.midBlock.name',
                        { required: true })}
                    id="mb-name" />
                {errors?.stats?.reliablePerformance?.midBlock?.name &&
                    <Message text={errors.stats?.reliablePerformance?.midBlock?.name.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="assists">Assist</label>
                <input
                    type="number"
                    {...register('stats.reliablePerformance.midBlock.assists',
                        { valueAsNumber: true, onBlur: assistsValidation, required: true })}
                    id="assists"
                    min={0} />
                {errors.stats?.reliablePerformance?.midBlock?.assists &&
                    <Message text={errors.stats?.reliablePerformance?.midBlock?.assists.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="comp-passes-avg">Completed passes</label>
                <input
                    type="number"
                    {...register('stats.reliablePerformance.midBlock.completedPasses',
                        { valueAsNumber: true, onBlur: completedPassesValidation, required: true })}
                    id="comp-passes-avg"
                    min={0} />
                {errors.stats?.reliablePerformance?.midBlock?.completedPasses &&
                    <Message text={errors.stats?.reliablePerformance?.midBlock?.completedPasses.message as string} kind='error' />
                }
            </div>
        </>
    )
}