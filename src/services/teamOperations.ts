import axios from "axios"
import { ILeague, ITeam } from "../types"
import { Response } from "../types/services-params"

export const fetchTeams = ({ token, leagueId }: { token: string, leagueId: string }) => axios
    .get<Response<ILeague>>(`http://localhost:3000/api/leagues/${leagueId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
    .then(json => json.data)
    .then(league => league.teams)

export const fetchTeam = ({ token, leagueId, teamId }: { token: string, leagueId: string, teamId: string }) => axios
    .get<Response<ITeam>>(`http://localhost:3000/api/leagues/teams/${leagueId}?tid=${teamId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
    .then(json => json.data)

export const postTeam = ({ token, leagueId, body }: { token: string, leagueId: string, body: ITeam }) => axios
    .post<Response<string>>(`http://localhost:3000/api/leagues/teams/${leagueId}`, body, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)

export const patchTeam = ({ token, leagueId, teamId, body }: { token: string, leagueId: string, teamId?: string, body: ITeam }) => axios
    .patch<Response<string>>(`http://localhost:3000/api/leagues/teams/${leagueId}?tid=${teamId as string}`, body, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)

export const deleteTeam = ({ token, leagueId, teamId }: { token: string, leagueId: string, teamId: string }) => axios
    .delete<Response<string>>(`http://localhost:3000/api/leagues/teams/${leagueId}?tid=${teamId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)