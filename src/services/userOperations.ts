import axios from "axios";
import { IUser } from "../types";
import { UserResponse } from "../types/services-params";

export const signup = (body: Omit<IUser, '_id' | 'rol'>) => axios
    .post<UserResponse>('http://localhost:3000/users/signup', body)
    .then(data => data.data)
    .then(info => info)

export const login = (body: Omit<IUser, '_id' | 'rol'>) => axios
    .post<UserResponse>('http://localhost:3000/users/login', body)
    .then(data => data.data)
    .then(info => info)