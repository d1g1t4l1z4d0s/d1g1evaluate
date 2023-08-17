import { useTeamContext } from '../../../hooks/team-operations'
import Message from '../../GeneralStuff/Message'

export default function LowBlockFields() {
    const { register, formState: { errors } } = useTeamContext()
    return (
        <>
            <div className="form-group">
                <label htmlFor="lb-name">Name</label>
                <input
                    type="text"
                    {...register('stats.reliablePerformance.lowBlock.name',
                        { required: true })}
                    id="lb-name" />
                {errors?.stats?.reliablePerformance?.lowBlock?.name &&
                    <Message text={errors.stats?.reliablePerformance?.lowBlock?.name.message as string} kind='error'/>
                }
            </div>

            <div className="form-group">
                <label htmlFor="behavior">Behavior</label>
                <select
                    {...register('stats.reliablePerformance.lowBlock.behavior',
                        { required: true })}
                    id="behavior">
                    <option value="bad">bad</option>
                    <option value="regular">regular</option>
                    <option value="good">good</option>
                </select>
                {errors?.stats?.reliablePerformance?.lowBlock?.behavior &&
                    <Message text={errors.stats?.reliablePerformance?.lowBlock?.behavior.message as string} kind='error'/>
                }
            </div>

            <div className="form-group">
                <label htmlFor="tackles">Tackles</label>
                <input
                    type="number"
                    {...register('stats.reliablePerformance.lowBlock.tackles',
                        { valueAsNumber: true, required: true })}
                    id="tackles"
                    min={0} />
                {errors?.stats?.reliablePerformance?.lowBlock?.tackles &&
                    <Message text={errors.stats?.reliablePerformance?.lowBlock?.tackles.message as string} kind='error'/>
                }
            </div>
        </>
    )
}