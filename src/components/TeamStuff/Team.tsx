import { useReducer } from "react"
import { useFetchTeam } from "../../hooks/team-operations"
import { RELIABLE_PERFORMANCE_TYPES } from "../../helpers/context-dispatcher-enums"
import { relPerfInitialState, reliablePerformanceReducer } from "../../reducers/realiable-performance-reducer"
import GoalkeeperModal from "./CustomModals/GoalkeeperModal"
import HighBlockModal from "./CustomModals/HighBlockModal"
import LowBlockModal from "./CustomModals/LowBlockModal"
import MidBlockModal from "./CustomModals/MidBlockModal"
import './Team.css'

export default function Team({ leagueId, teamId }: { leagueId: string, teamId: string }) {
    const { data, error, isLoading } = useFetchTeam({ leagueId, teamId })
    const [state, dispatch] = useReducer(reliablePerformanceReducer, relPerfInitialState)
    if (error !== null) return (<p>Error when retrieving team data</p>)
    if (isLoading) return (<p>Loading data team...</p>)
    if (data === null) return (<p>There's no team data available</p>)

    return (
        <div className='team-container'>
            <header>
                <img src={data?.logo} alt={`${data?.name || 'team'} image`} />
                <h4>{data?.name}</h4>
            </header>
            <div className='team-data'>
                <p><strong>Manager:</strong> {data?.manager}</p>
                <p><strong>Scored goals:</strong> {data?.stats.scoredGoals}</p>
                <p><strong>Goals against:</strong> {data?.stats.goalsAgainst}</p>
                <p><strong>Goal balance:</strong> {data?.stats.goalBalance}%</p>
                <p><strong>Matches:</strong> {data?.stats.matches}</p>
                <p><strong>Wins:</strong> {data?.stats.wins}</p>
                <p><strong>Draws:</strong> {data?.stats.draws}</p>
                <p><strong>Losses:</strong> {data?.stats.losses}</p>
                <p><strong>Points average:</strong> {data?.stats.pointsAverage}/3</p>
                <p><strong>Red cards:</strong> {data?.stats.redCards}</p>
                <p><strong>Yellow cards:</strong> {data?.stats.yellowCards}</p>

                <h5 onClick={() => dispatch({ type: RELIABLE_PERFORMANCE_TYPES.GOALKEEPER })}>Goalkeeper</h5>
                {(state.currentPerformance === 'goalkeeper' && data !== undefined) &&
                    <GoalkeeperModal {...data.stats.reliablePerformance.goalkeeper} quitPerformance={dispatch}/>
                }

                <h5 onClick={() => dispatch({ type: RELIABLE_PERFORMANCE_TYPES.LOWBLOCK })}>Low block</h5>
                {(state.currentPerformance === 'lowblock' && data !== undefined) &&
                    <LowBlockModal {...data.stats.reliablePerformance.lowBlock} quitPerformance={dispatch}/>
                }

                <h5 onClick={() => dispatch({ type: RELIABLE_PERFORMANCE_TYPES.MIDBLOCK })}>Mid block</h5>
                {(state.currentPerformance === 'midblock' && data !== undefined) &&
                    <MidBlockModal {...data.stats.reliablePerformance.midBlock} quitPerformance={dispatch}/>
                }

                <h5 onClick={() => dispatch({ type: RELIABLE_PERFORMANCE_TYPES.HIGHBLOCK })}>High block</h5>
                {(state.currentPerformance === 'highblock' && data !== undefined) &&
                    <HighBlockModal {...data.stats.reliablePerformance.highBlock} quitPerformance={dispatch}/>
                }
            </div>
        </div>

    )
}