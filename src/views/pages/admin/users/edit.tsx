import { FC, useCallback, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Label, TextInput, Select } from 'flowbite-react'

import { Role, User } from '../../../../services/types/users'
import { getRoles, update } from '../../../../services/users'

type Inputs = {
    names: string
    lastNames: string
    email: string
    password: string
    roleCode: number
    avatar: string | null
}
interface Props {
    user: User | undefined
    editUser: (user: User) => void
}
const EditUser: FC<Props> = ({ user, editUser }) => {
    const [error, setError] = useState('')
    const [roles, setRoles] = useState<Role[]>()
    const [submit, setSubmit] = useState(false)
    const {
        handleSubmit,
        register,
        //setError,
        formState: { errors },
        reset,
    } = useForm<Inputs>()

    useEffect(() => {
        reset({
            names: user?.names,
            lastNames: user?.lastNames,
            roleCode: user?.roleCode,
            avatar: user?.avatar,
            email: user?.email,
        })
    }, [user, reset])

    useEffect(() => {
        if (!roles) {
            get()
        }
    }, [])

    const get = useCallback(async () => {
        const roles = await getRoles()
        if (roles && roles.status === 'SUCCESS') {
            setRoles(roles.result)
        }
    }, [])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setSubmit(true)
        setError('')
        const updateUser = await update({ id: user?.id, ...data })
        if (updateUser && updateUser.status === 'SUCCESS') {
            editUser(updateUser.result)
            setSubmit(false)
            reset()
        } else if (updateUser && updateUser.status === 'ERROR') {
            setSubmit(false)
            setError(updateUser.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className='mb-2 block'>
                    <Label htmlFor='names' value='Nombres' /> <Label color='failure'>*</Label>
                </div>
                <TextInput
                    type='text'
                    color={errors.names && 'failure'}
                    disabled={submit}
                    {...register('names', { required: true })}
                />
                {errors.names && (
                    <Label color='failure' className='text-xs'>
                        Este campo es requerido
                    </Label>
                )}
            </div>
            <div className='mt-4'>
                <div className='mb-2 block'>
                    <Label htmlFor='lastNames' value='Apellidos' /> <Label color='failure'>*</Label>
                </div>
                <TextInput
                    type='text'
                    color={errors.lastNames && 'failure'}
                    disabled={submit}
                    {...register('lastNames', { required: true })}
                />
                {errors.lastNames && (
                    <Label color='failure' className='text-xs'>
                        Este campo es requerido
                    </Label>
                )}
            </div>
            {/* <div className='mt-4'>
                <div className='mb-2 block'>
                    <Label htmlFor='avatar' value='Foto' />
                </div>
                <FileInput id='avatar' color={errors.avatar && 'failure'} {...register('avatar')} />
            </div> */}
            <div className='mt-4'>
                <div className='mb-2 block'>
                    <Label htmlFor='roleCode' value='Rol' /> <Label color='failure'>*</Label>
                </div>
                <Select disabled={submit} {...register('roleCode', { required: true })}>
                    {roles &&
                        roles.map((rol, index) => (
                            <option key={`OptionRole${index}`} value={rol.code}>
                                {rol.name}
                            </option>
                        ))}
                </Select>
            </div>
            <div className='mt-4'>
                <div className='mb-2 block'>
                    <Label htmlFor='email' value='Correo electrónico' />{' '}
                    <Label color='failure'>*</Label>
                </div>
                <TextInput
                    type='email'
                    color={errors.email && 'failure'}
                    disabled={submit}
                    {...register('email', { required: true })}
                />
                {errors.email && (
                    <Label color='failure' className='text-xs'>
                        Este campo es requerido
                    </Label>
                )}
            </div>
            <div className='mt-4'>
                <div className='mb-2 block'>
                    <Label htmlFor='password' value='Contraseña' />
                </div>
                <TextInput
                    type='password'
                    color={errors.password && 'failure'}
                    disabled={submit}
                    {...register('password', { required: false, minLength: 8 })}
                />
                {errors.password?.type === 'required' && (
                    <Label color='failure' className='text-xs'>
                        Este campo es requerido
                    </Label>
                )}
                {errors.password?.type === 'minLength' && (
                    <Label color='failure' className='text-xs'>
                        Debe tener mínimo 8 caracteres
                    </Label>
                )}
            </div>
            <div className='mt-6'>
                <Button type='submit' className='w-full' disabled={submit} isProcessing={submit}>
                    Editar
                </Button>
                {error !== '' && (
                    <Label color='failure' className='text-xs'>
                        {error}
                    </Label>
                )}
            </div>
        </form>
    )
}

export default EditUser
