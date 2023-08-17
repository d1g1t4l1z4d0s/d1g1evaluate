import { z } from "zod"

const patterns = {
    password: /^((\w+[?#&$!+|-]+)|([?#&$!+|-]+\w+)).+$/
}

export const UserSchema = z.object({
    username: z.string().min(5, 'Username field must contain at least five characters').nonempty('Username field is required'),
    password: z.string().nonempty('Password field is required').min(8, 'Password field must contain at least eight characters').regex(patterns.password, 'Password is too weak, include characters (e.g ?#&$!+|-)'),
})