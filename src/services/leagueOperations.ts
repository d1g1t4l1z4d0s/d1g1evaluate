import axios from "axios"
import { ILeague } from "../types"
import { Response } from "../types/services-params"

export const fetchLeagues = (token: string) => axios
    .get<Response<ILeague[]>>('http://localhost:3000/api/leagues', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
    .then(json => json.data)

export const fetchLeague = ({ token, leagueId }: { token: string, leagueId: string }) => axios
    .get<Response<ILeague>>(`http://localhost:3000/api/leagues/${leagueId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
    .then(json => json.data)

export const postLeague = ({ token, body }: { token: string, body: Omit<ILeague, "_id" | "teams"> }) => axios
    .post<Response<string>>(`http://localhost:3000/api/leagues`, body, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)

export const patchLeague = ({ token, leagueId, body }: { token: string, leagueId?: string, body: Omit<ILeague, '_id' | 'teams'> }) => axios
    .patch<Response<string>>(`http://localhost:3000/api/leagues/${leagueId as string}`, body, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)

export const deleteLeague = ({ token, leagueId }: { token: string, leagueId: string }) => axios
    .delete<Response<string>>(`http://localhost:3000/api/leagues/${leagueId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
