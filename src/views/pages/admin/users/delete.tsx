import { FC, useState } from 'react'
import { Button, Label } from 'flowbite-react'

import { del } from '../../../../services/users'

interface Props {
    id: number
    removeUser: (id: number) => void
}
const DeleteUser: FC<Props> = ({ id, removeUser }) => {
    const [error, setError] = useState('')
    const [submit, setSubmit] = useState(false)

    const onDelete = async () => {
        setSubmit(true)
        const delUser = await del(id)
        if (delUser && delUser.status === 'SUCCESS') {
            removeUser(delUser.result)
            setSubmit(false)
        } else if (delUser && delUser.status === 'ERROR') {
            setSubmit(false)
            setError(delUser.message)
        }
    }
    return (
        <div className='text-center'>
            <p className='py-7'>¿Seguro desea eliminar el usuario?</p>
            <div className='flex justify-between'>
                <Button color='failure' disabled={submit} onClick={onDelete}>
                    Si, estoy seguro
                </Button>
                <Button color='gray' disabled={submit}>
                    No, Cancelar
                </Button>
            </div>
            {error !== '' && (
                <Label color='failure' className='text-xs'>
                    {error}
                </Label>
            )}
        </div>
    )
}

export default DeleteUser
