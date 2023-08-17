export type Response<T> = {
    data : T
}
export type UserResponse = {
    username: string
    token: string
    rol: 'common' | 'super'
}