import { Link } from "react-router-dom"
import { ITeam } from "../../types"
import { UseMutateFunction } from "react-query";
import { useAuthContext } from "../../hooks/user-operations";
import './AdminTeams.css'
import { AxiosError } from "axios";
import { Response } from "../../types/services-params";

export default function AdminTeams({ data, leagueId, mutateAsDelete }: {
    data: ITeam[],
    leagueId: string,
    mutateAsDelete: UseMutateFunction<Response<string>, AxiosError<unknown, any>,
        {
            token: string;
            leagueId: string;
            teamId: string;
        }, unknown>
}) {
    const { state: { token } } = useAuthContext()
    return (
        <div className='teams-adm-container'>
            {data?.map(team => (
                <div key={team.teamId} className='team-figure-container'>
                    <span className="material-symbols-outlined delete" onClick={() => mutateAsDelete({ token: token as string, leagueId, teamId: team.teamId })}>delete</span>
                    <Link to={`../teams/${leagueId}?tid=${team.teamId}`}>
                        <header>
                            <img src={team.logo} alt={`${team.name || 'team'} image`} />
                            <h4>{team.name}</h4>
                        </header>
                    </Link>
                </div>
            ))}
        </div>
    )
}