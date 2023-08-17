import { useEffect } from "react"
import { SubmitHandler } from "react-hook-form"
import { ILeague, ITeam } from "../../types"
import { UseMutateFunction } from "react-query";
import { defaultLeagueForm } from "../../helpers/context-default-values"
import { useAuthContext } from "../../hooks/user-operations"
import { useLeagueContext } from "../../hooks/league-operations";
import Message from "../GeneralStuff/Message"
import './LeagueForm.css'
import { Response } from "../../types/services-params";
import { AxiosError } from "axios";

type LeagueFormProps = {
    leagueId?: string
    teams?: ITeam[]
    mode: 'post' | 'patch'
    mutate: UseMutateFunction<Response<string>, AxiosError<unknown, any>,
        {
            token: string;
            leagueId?: string | undefined;
            body: Omit<ILeague, "_id" | "teams">;
        }, unknown>
}

export default function LeagueForm({ leagueId, teams, mode, mutate }: LeagueFormProps) {
    const {
        formState: { errors },
        reset,
        handleSubmit,
        register
    } = useLeagueContext()
    const { state: { token } } = useAuthContext()

    useEffect(() => {
        if (mode === 'post') return reset(defaultLeagueForm)
    }, [mode, reset])

    const onSubmit: SubmitHandler<Omit<ILeague, '_id' | 'teams'>> = (data) => {
        mutate({ token: token as string, leagueId, body: data })
    }

    return (
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className='league-form'>
            <div className="form-group">
                <label htmlFor="league-name">Name</label>
                <input
                    type="text"
                    {...register('name', { required: true })}
                    id="league-name" />
                {errors.name &&
                    <Message text={errors.name.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="league-logo">Logo</label>
                <input
                    type="text"
                    {...register('logo', { required: true })}
                    id="league-logo"
                />
                {errors.logo &&
                    <Message text={errors.logo.message as string} kind='error' />
                }
            </div>

            <div className="form-group">
                <label htmlFor="league-crr-champ">Current champion</label>
                <select
                    {...register('currentChampion', { required: true })}
                    id="league-crr-champ">
                    {(teams?.length === 0 || !teams) &&
                        <option value='Insert teams' defaultChecked={true}>Insert teams</option>
                    }
                    {
                        teams?.map(team => (
                            <option key={team.teamId} value={team.name}>{team.name}</option>
                        ))
                    }
                </select>
                {errors.currentChampion &&
                    <Message text={errors.currentChampion.message as string} kind='error' />
                }
            </div>

            {!(Object.keys(errors).length > 0)
                ? <input type="submit" className="button" value="Send" />
                : <Message text={'Check point error to continue'} kind='warning' />
            }
        </form>
    )
}