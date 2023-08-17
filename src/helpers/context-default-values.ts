import { ILeague, ITeam } from "../types";

export const defaultLeagueForm: Omit<ILeague, '_id' | 'teams'> = {
    name: '',
    logo: '',
    currentChampion: 'Insert teams',
}

export const defaultTeamForm: ITeam = {
    teamId: '',
    name: '',
    manager: '',
    logo: '',
    stats: {
        scoredGoals: 0,
        goalsAgainst: 0,
        goalBalance: 0,
        pointsAverage: 0,
        matches: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        yellowCards: 0,
        redCards: 0,
        reliablePerformance: {
            goalkeeper: {
                name: '',
                caughtBalls: 0,
                concededGoals: 0,
                cleanSheets: 0
            },
            lowBlock: {
                name: '',
                behavior: "regular",
                tackles: 0
            },
            midBlock: {
                name: '',
                completedPasses: 0,
                assists: 0
            },
            highBlock: {
                name: '',
                scoredGoals: 0,
                shotsOnTarget: 0
            }
        }
    }
}

