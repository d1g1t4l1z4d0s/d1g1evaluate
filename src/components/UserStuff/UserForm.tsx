import { useForm } from 'react-hook-form'
import { SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { IUser } from '../../types'
import { UseMutateFunction } from 'react-query'
import { UserResponse } from '../../types/services-params'
import { UserSchema } from '../../helpers/validation/user-validator'
import Message from '../GeneralStuff/Message'
import './UserForm.css'

type UserFormParams = {
    mode: 'signup' | 'login'
    mutate: UseMutateFunction<UserResponse, unknown, Omit<IUser, "_id" | "rol">, unknown>
}

const defaultUserForm: Omit<IUser, '_id' | 'rol'> & { confirmPassword: string } = {
    username: '',
    password: '',
    confirmPassword: ''
}

export default function UserForm({ mode, mutate }: UserFormParams) {
    const {
        register,
        formState: { errors, dirtyFields },
        setError,
        watch,
        handleSubmit
    } = useForm<Omit<IUser, '_id' | 'rol'> & { confirmPassword: string }>({
        mode: 'onChange',
        defaultValues: defaultUserForm,
        resolver: zodResolver(UserSchema),
        shouldFocusError: true
    })

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target
        const password = watch('password')
        const confirmPassword = watch('confirmPassword')
        if (mode !== 'signup') return
        if (value !== password || value !== confirmPassword) setError(
            'confirmPassword',
            {
                type: 'manual',
                message: `Passwords don't match`
            }
        )
    }

    const onSubmit: SubmitHandler<Omit<IUser, '_id' | 'rol'>> = data => {
        mutate(data)
    }

    return (
        <form className='user-form' onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
            <div className='form-group'>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    {...register('username', { required: true })}
                    id="username" />
                {errors.username &&
                    <Message text={errors.username.message as string} kind='error' />
                }
            </div>
            <div className='form-group'>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    {...register('password', { required: true, onBlur: handleBlur })}
                    id="password" />
                {errors.password &&
                    <Message text={errors.password.message as string} kind='error' />
                }
            </div>
            {(mode === 'signup') &&
                <div className='form-group'>
                    <label htmlFor="confirm-password">Confirm password</label>
                    <input
                        type="password"
                        {...register('confirmPassword', { required: false, onBlur: handleBlur })}
                        id="confirm-password" />
                    {errors.confirmPassword &&
                        <Message text={errors.confirmPassword.message as string} kind='error' />
                    }
                </div>
            }
            {!(errors.username || errors.password || errors.confirmPassword) && (dirtyFields.password && dirtyFields.username)
                ? <input type="submit" className="button" value="Send" />
                : <Message text='Fill all the fields correctly, please' kind='warning' />
            }
        </form>
    )
}