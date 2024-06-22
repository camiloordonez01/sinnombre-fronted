import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'

// Store
import { pushNotification } from '../../../../store/slices/appState'
import { AppDispatch } from '../../../../store'

import { login } from '../../../../services/auth'

import { DASHBOARD } from '../../../../utils/constants'

type Inputs = {
    email: string
    password: string
}

const LoginPage: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const [isLogin, setIsLogin] = useState(true)
    const [submit, setSubmit] = useState(false)
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors },
    } = useForm<Inputs>()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) navigate(DASHBOARD)

        setIsLogin(false)
    }, [])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setSubmit(true)
        const resultLogin = await login(data.email, data.password)
        if (resultLogin && resultLogin.status === 'ERROR') {
            dispatch(pushNotification({ type: 'danger', message: 'No se pudo iniciar sesión.' }))
            setError('password', { message: resultLogin.message })
            setSubmit(false)
        } else if (resultLogin) {
            localStorage.setItem('token', resultLogin.result)
            dispatch(
                pushNotification({ type: 'success', message: 'Se inicio sesión correctamente.' }),
            )
            navigate(DASHBOARD)
        }
    }
    return (
        <>
            {!isLogin && (
                <div className='flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900'>
                    <a
                        href='https://flowbite-admin-dashboard.vercel.app/'
                        className='flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white'
                    >
                        <span>Sin Nombre</span>
                    </a>
                    <Card className='w-full max-w-sm'>
                        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                            Iniciar sesión
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                            <div>
                                <div className='mb-2 block'>
                                    <Label htmlFor='email1' value='Tu email' />
                                </div>
                                <TextInput
                                    id='email1'
                                    type='email'
                                    placeholder='name@mail.com'
                                    disabled={submit}
                                    required
                                    {...register('email', { required: true })}
                                />
                            </div>
                            <div>
                                <div className='mb-2 block'>
                                    <Label htmlFor='password1' value='Tu contraseña' />
                                </div>
                                <TextInput
                                    id='password1'
                                    type='password'
                                    placeholder='••••••••'
                                    disabled={submit}
                                    required
                                    {...register('password', { required: true })}
                                />
                            </div>
                            <div className='items-center gap-2 hidden'>
                                <Checkbox id='remember' />
                                <Label htmlFor='remember'>Recuérdeme</Label>
                            </div>
                            <Button disabled={submit} type='submit' isProcessing={submit}>
                                Iniciar sesión
                            </Button>
                            {errors.password && (
                                <div>
                                    <span className='font-medium'>Oops!</span>{' '}
                                    {errors.password.message}
                                </div>
                            )}
                        </form>
                    </Card>
                </div>
            )}
        </>
    )
}

export default LoginPage
