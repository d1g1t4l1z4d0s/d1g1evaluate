import { useParams, useSearchParams } from "react-router-dom"
import { useFetchTeam, usePatchTeam, usePostTeam } from "../hooks/team-operations"
import TeamForm from "../components/TeamStuff/TeamForm"

export default function TeamDetails() {
    let { leagueId } = useParams()
    leagueId = leagueId as string
    const [searchParams] = useSearchParams()
    const teamId = searchParams.get('tid') as string

    const { data, error, isLoading } = useFetchTeam({ leagueId, teamId })
    const { mutate: patchMutate } = usePatchTeam()
    const { mutate: postMutate } = usePostTeam()

    if (error !== null) return (<p>Team error</p>)
    if (isLoading) return <p>Loading team...</p>
    if (data === null) return <p>There is no data available</p>

    return (
        <main className="content">
            <article>
                {teamId &&
                    <>
                        <header className='card-alone'>
                            <img src={data?.logo} alt={`${data?.name || 'team'} image`} />
                            <h2>{data?.name}</h2>
                        </header>
                        <TeamForm leagueId={leagueId} teamId={teamId} mutate={patchMutate} mode='patch' />
                    </>
                }
                {!teamId &&
                    <>
                        <h2>Add Team</h2>
                        <TeamForm leagueId={leagueId} mutate={postMutate} mode='post' />
                    </>
                }
            </article>
        </main>
    )
}