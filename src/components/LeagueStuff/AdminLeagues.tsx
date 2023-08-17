import { UseMutateFunction } from "react-query";
import { Link } from "react-router-dom"
import { ILeague } from "../../types"
import { useAuthContext } from "../../hooks/user-operations";
import './AdminLeagues.css'
import { Response } from "../../types/services-params";
import { AxiosError } from "axios";

type AdminLeaguesProps = {
    data: ILeague[],
    mutateAsDelete: UseMutateFunction<Response<string>, AxiosError<unknown, any>,
        {
            token: string;
            leagueId: string;
        }, unknown>
}

export default function AdminLeagues({ data, mutateAsDelete }: AdminLeaguesProps) {
    const { state: { token } } = useAuthContext()
    return (
        <div className='leagues-adm-container'>
            {data.map(league => (
                <div key={league._id} className='league-container'>
                    <span
                        className="material-symbols-outlined delete"
                        onClick={() => mutateAsDelete({ token: token as string, leagueId: league._id })}>
                        delete
                    </span>
                    <Link to={`../leagues/${league._id}`}>
                        <header>
                            <img src={league.logo} alt={`${league.name || 'team'} image`} />
                            <h4>{league.name}</h4>
                        </header>
                    </Link>
                </div>
            ))}
        </div>
    )
}