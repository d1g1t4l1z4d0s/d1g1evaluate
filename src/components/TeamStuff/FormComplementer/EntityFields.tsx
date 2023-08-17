import { useTeamContext } from '../../../hooks/team-operations'
import Message from '../../GeneralStuff/Message'

export default function EntityFields({ mode }: { mode: 'post' | 'patch' }) {
    const { register, formState: { errors } } = useTeamContext()

    return (
        <>
            <div className="form-group">
                <label htmlFor="team-id">Team id</label>
                <input
                    type="text"
                    {...register('teamId', { required: true })}
                    id="team-name"
                    disabled={mode === 'post' ? false : true} />
                {errors?.teamId &&
                    <Message text={errors?.teamId.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="team-name">Name</label>
                <input
                    type="text"
                    {...register('name', { required: true })}
                    id="team-name" />
                {errors?.name &&
                    <Message text={errors?.name.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="team-manager">Manager</label>
                <input
                    type="text"
                    {...register('manager', { required: true })}
                    id="team-manager" />
                {errors?.manager &&
                    <Message text={errors?.manager.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="team-logo">Logo</label>
                <input
                    type="text"
                    {...register('logo', { required: true })}
                    id="team-logo" />
                {errors?.logo &&
                    <Message text={errors?.logo.message as string} kind='error' />
                }
            </div>
        </>
    )
}