import { Link, useParams } from "react-router-dom"
import { useFetchLeague, usePatchLeague } from "../hooks/league-operations"
import { useDeleteTeam } from '../hooks/team-operations'
import LeagueForm from '../components/LeagueStuff/LeagueForm'
import AdminTeams from '../components/TeamStuff/AdminTeams'

export default function LeagueDetails() {
    let { leagueId } = useParams()
    leagueId = leagueId as string
    const { data, error, isLoading } = useFetchLeague(leagueId)
    const { mutate: patchMutate } = usePatchLeague()
    const { mutate: mutateAsDelete } = useDeleteTeam()

    if (error !== null) return (<p>League error</p>)
    if (isLoading) return <p>Loading league...</p>
    if (data === null) return <p>There is no data available</p>
    if (typeof data === "undefined") return <p>No form data</p>

    return (
        <main className='content'>
            <h1>{data.name}</h1>
            <article>
                <LeagueForm leagueId={leagueId} teams={data.teams} mutate={patchMutate} mode='patch' />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ display: 'inline' }}>Teams</h3>
                    <button className='button'>
                        <Link to={`../teams/${leagueId}`} style={{ color: 'inherit', display: 'block' }}>Add new team</Link>
                    </button>
                </div>
                <AdminTeams data={data.teams} leagueId={leagueId} mutateAsDelete={mutateAsDelete} />
            </article>
        </main>
    )
}