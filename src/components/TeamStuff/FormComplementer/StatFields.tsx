import { FocusEvent, useCallback, useEffect, useMemo } from 'react'
import Message from '../../GeneralStuff/Message'
import { useTeamContext } from '../../../hooks/team-operations'

export default function StatField() {
    const { 
        watch,
        setValue,
        register,
        formState: { errors },
        setError,
        clearErrors
    } = useTeamContext()
    const scoredGoals = watch('stats.scoredGoals')
    const goalsAgainst = watch('stats.goalsAgainst')
    const matches = watch('stats.matches')
    const wins = watch('stats.wins')
    const draws = watch('stats.draws')
    const losses = watch('stats.losses')
    const calculatedGoal = useMemo(() => Number.parseFloat(((scoredGoals - goalsAgainst) / (matches)).toFixed(2)), [scoredGoals, goalsAgainst, matches])
    const calculatedPoints = useMemo(() => Number.parseFloat((((wins * 3) + draws) / matches).toFixed(2)), [wins, draws, matches])

    useEffect(() => {
        setValue('stats.goalBalance', calculatedGoal || 0)
        setValue('stats.pointsAverage', calculatedPoints || 0)
    }, [setValue, calculatedGoal, calculatedPoints])

    const validateMatchNumber = useCallback((e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const valueAsNumber = Number.parseInt(value)
        if (name === 'stats.matches') {
            if (valueAsNumber !== (wins + draws + losses)) setError(
                'stats.matches',
                {
                    type: 'manual',
                    message: 'Total matches must coincide with (wins + draws + losses)'
                }
            )
            else clearErrors('stats.matches')
        }

        if (name === 'stats.wins') {
            if (matches !== (valueAsNumber + draws + losses)) setError(
                'stats.matches',
                {
                    type: 'manual',
                    message: 'Total matches must coincide with (wins + draws + losses)'
                }
            )
            else clearErrors('stats.matches')
        }

        if (name === 'stats.draws') {
            if (matches !== (wins + valueAsNumber + losses)) setError(
                'stats.matches',
                {
                    type: 'manual',
                    message: 'Total matches must coincide with (wins + draws + losses)'
                }
            )
            else clearErrors('stats.matches')
        }

        if (name === 'stats.losses') {
            if (matches !== (wins + draws + valueAsNumber)) setError(
                'stats.matches',
                {
                    type: 'manual',
                    message: 'Total matches must coincide with (wins + draws + losses)'
                }
            )
            else clearErrors('stats.matches')
        }
    }, [matches, wins, draws, losses, setError, clearErrors])

    return (
        <>
            <div className="form-group">
                <label htmlFor="scored-goals">Scored goals</label>
                <input
                    type="number"
                    {...register('stats.scoredGoals',
                        { valueAsNumber: true, required: true })}
                    id="scored-goals"
                    min={0} />
                {errors?.stats?.scoredGoals &&
                    <Message text={errors?.stats?.scoredGoals.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="goals-against">Goals against</label>
                <input
                    type="number"
                    {...register('stats.goalsAgainst',
                        { valueAsNumber: true, required: true })}
                    id="goals-against"
                    min={0} />
                {errors?.stats?.goalsAgainst &&
                    <Message text={errors?.stats?.goalsAgainst.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="goal-balance">Goal balance (FA)</label>
                <input
                    type="number"
                    {...register('stats.goalBalance',
                        { valueAsNumber: true, required: true })}
                    id="goal-balance"
                    readOnly={true} />
            </div>

            <div className="form-group">
                <label htmlFor="matches">Matches</label>
                <input
                    type="number"
                    {...register('stats.matches',
                        { valueAsNumber: true, required: true, onBlur: validateMatchNumber })}
                    id="matches"
                    min={0} />
                {errors?.stats?.matches &&
                    <Message text={errors?.stats?.matches.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="wins">Wins</label>
                <input
                    type="number"
                    {...register('stats.wins',
                        { valueAsNumber: true, required: true, onBlur: validateMatchNumber })}
                    id="wins"
                    min={0} />
                {errors?.stats?.wins &&
                    <Message text={errors?.stats?.wins.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="draws">Draws</label>
                <input
                    type="number"
                    {...register('stats.draws',
                        { valueAsNumber: true, required: true, onBlur: validateMatchNumber })}
                    id="draws"
                    min={0} />
                {errors?.stats?.draws &&
                    <Message text={errors?.stats?.draws.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="losses">Losses</label>
                <input
                    type="number"
                    {...register('stats.losses',
                        { valueAsNumber: true, required: true, onBlur: validateMatchNumber })}
                    id="losses"
                    min={0} />
                {errors?.stats?.losses &&
                    <Message text={errors?.stats?.losses.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="match-average">Points average (FA)</label>
                <input
                    type="number"
                    {...register('stats.pointsAverage',
                        { valueAsNumber: true, required: true })}
                    id="match-average"
                    readOnly={true} />
            </div>

            <div className="form-group">
                <label htmlFor="yellow-cards">Yellow cards</label>
                <input
                    type="number"
                    {...register('stats.yellowCards',
                        { valueAsNumber: true, required: true })}
                    id="yellow-cards"
                    min={0} />
                {errors?.stats?.yellowCards &&
                    <Message text={errors?.stats?.yellowCards.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="red-cards">Red cards</label>
                <input
                    type="number"
                    {...register('stats.redCards',
                        { valueAsNumber: true, required: true })}
                    id="red-cards"
                    min={0} />
                {errors?.stats?.redCards &&
                    <Message text={errors?.stats?.redCards.message as string} kind='error' />
                }
            </div>
        </>
    )
}