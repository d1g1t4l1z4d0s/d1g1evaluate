import { useState } from 'react'
import { useFetchLeagues } from '../../hooks/league-operations'
import { useFetchTeams } from '../../hooks/team-operations'
import Team from './Team'
import './TeamSelector.css'

export default function TeamSelector() {
    const [leagueId, setLeagueId] = useState<string>('')
    const [teamId, setTeamId] = useState<string>('')
    const { data: leagueData, error: leagueError, isFetching: leagueIsFetching, isLoading: leagueIsLoading } = useFetchLeagues()
    const { data: teamData, error: teamError, isLoading: teamIsLoading } = useFetchTeams(leagueId)

    if (leagueError !== null) return (<p>League error</p>)
    if (teamError !== null) return (<p>Team error</p>)
    if (leagueIsLoading || leagueIsFetching) return <p>Loading leagues...</p>
    if (teamIsLoading) return <p>Loading teams...</p>

    if (typeof leagueData === 'undefined') return (<p>There are no leagues available yet</p>)

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>, willSetLeague = true) => {
        willSetLeague ? setLeagueId(e.target.value ?? '') : setTeamId(e.target.value ?? '')
    }

    return (
        <div className='selector-container'>
            {!(leagueId && teamId) &&
                <div className='league-selector'>
                    <label>
                        League
                        <select onChange={handleOnChange} value={leagueId}>
                            <option value='' disabled={true}>Select a league</option>
                            {leagueData.map(league => (
                                <option key={league._id} value={league._id} title={league.name}>{league.name}</option>
                            ))}
                        </select>
                    </label>
                </div>}
            {(leagueId && !teamId) &&
                <div className='team-selector'>
                    <label>
                        Team
                        <select onChange={(e) => handleOnChange(e, false)} value={teamId}>
                            <option value='' disabled={true}>Select a team</option>
                            {teamData?.map(team => (
                                <option key={team.teamId} value={team.teamId}>{team.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
            }
            {teamId &&
                <>
                    <Team leagueId={leagueId} teamId={teamId} />
                    <button className='button' onClick={() => setTeamId('')}>Back</button>
                </> }
        </div>
    )
}