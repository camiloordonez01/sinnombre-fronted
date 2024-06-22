import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { Button, Label, TextInput, Select } from 'flowbite-react'

import { Role, User } from '../../../../services/types/users'
import { getRoles } from '../../../../services/users'

interface Props {
    user: User | undefined
    setView: Dispatch<SetStateAction<boolean | number>>
}
const ViewUser: FC<Props> = ({ user, setView }) => {
    const [roles, setRoles] = useState<Role[]>()

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
    return (
        <form>
            <div>
                <div className='mb-2 block'>
                    <Label htmlFor='names' value='Nombres' /> <Label color='failure'>*</Label>
                </div>
                <TextInput type='text' value={user?.names} disabled={true} />
            </div>
            <div className='mt-4'>
                <div className='mb-2 block'>
                    <Label htmlFor='lastNames' value='Apellidos' /> <Label color='failure'>*</Label>
                </div>
                <TextInput type='text' value={user?.lastNames} disabled={true} />
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
                <Select id='roleCode' disabled={true} value={user?.roleCode}>
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
                <TextInput type='email' value={user?.email} disabled={true} />
            </div>
            <div className='mt-6'>
                <Button className='w-full' onClick={() => setView(false)}>
                    Cerrar
                </Button>
            </div>
        </form>
    )
}

export default ViewUser
