import { FC, useCallback, useEffect, useState } from 'react'
import { Card, Drawer } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'

import {
    PiPlusLight,
    PiMagnifyingGlassLight,
    PiPencilSimpleLight,
    PiTrashLight,
} from 'react-icons/pi'

import { User } from '../../../../services/types/users'
import { getAll } from '../../../../services/users'
import TableCustom from '../../../../components/tableCustom'
import CreateUser from './create'
import DeleteUser from './delete'

// Store
import { Reducers } from '../../../../store'
import { pushNotification } from '../../../../store/slices/appState'
import { AppDispatch } from '../../../../store'
import ViewUser from './view'
import EditUser from './edit'

const UsersPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { email } = useSelector((state: Reducers) => state.userState)

    const [users, setUsers] = useState<User[]>()
    const [view, setView] = useState<boolean | number>(false)
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState<boolean | number>(false)
    const [del, setDelete] = useState<boolean | number>(false)

    const columns = [
        {
            name: 'names',
            label: 'Nombres',
            type: 'text',
        },
        {
            name: 'lastNames',
            label: 'Apellidos',
            type: 'text',
        },
        {
            name: 'email',
            label: 'Correo',
            type: 'text',
        },
        {
            name: 'avatar',
            label: 'Avatar',
            type: 'image',
        },
    ]

    useEffect(() => {
        if (!users) {
            get()
        }
    }, [])

    const get = useCallback(async () => {
        const getUsers = await getAll()
        if (getUsers && getUsers.status === 'SUCCESS') {
            setUsers(getUsers.result.filter((result) => result.email !== email))
        }
    }, [])

    const addUser = (user: User) => {
        if (users) {
            const newUsers = [...users, user]
            setUsers(newUsers)
            setCreate(false)
            dispatch(
                pushNotification({ type: 'success', message: 'Se creo el usuario correctamente.' }),
            )
        }
    }

    const editUser = (user: User) => {
        if (users) {
            const newUsers = [...users]

            const indexFind = newUsers.findIndex((oldUser) => oldUser.id === user.id)
            newUsers[indexFind] = user

            setUsers(newUsers)
            setEdit(false)
            dispatch(
                pushNotification({
                    type: 'success',
                    message: 'Se edito el usuario correctamente.',
                }),
            )
        }
    }

    const removeUser = (id: number) => {
        if (users) {
            const newUsers = users.filter((user) => user.id != id)
            setUsers(newUsers)
            setDelete(false)
            dispatch(
                pushNotification({
                    type: 'success',
                    message: 'Se elimino el usuario correctamente.',
                }),
            )
        }
    }

    return (
        <Card style={{ minHeight: 'calc(100vh - 228px)' }}>
            <h1 className='text-lg font-semibold text-gray-900 sm:text-xl dark:text-white mb-2'>
                Lista de usuarios
            </h1>
            {users ? (
                <TableCustom
                    data={users}
                    actions={['view', 'create', 'edit', 'delete']}
                    columns={columns}
                    dispatchView={setView}
                    dispatchCreate={setCreate}
                    dispatchEdit={setEdit}
                    dispatchDelete={setDelete}
                />
            ) : (
                <></>
            )}
            <Drawer open={view !== false} onClose={() => setView(false)} position='right'>
                <Drawer.Header title='Información del usuario' titleIcon={PiMagnifyingGlassLight} />
                <Drawer.Items>
                    <ViewUser
                        user={
                            typeof view === 'number'
                                ? users?.find((user) => user.id === view)
                                : undefined
                        }
                        setView={setView}
                    />
                </Drawer.Items>
            </Drawer>

            <Drawer open={create} onClose={() => setCreate(false)} position='right'>
                <Drawer.Header title='Crear un usuario' titleIcon={PiPlusLight} />
                <Drawer.Items>
                    <CreateUser addUser={addUser} />
                </Drawer.Items>
            </Drawer>

            <Drawer open={edit !== false} onClose={() => setEdit(false)} position='right'>
                <Drawer.Header title='Editar un usuario' titleIcon={PiPencilSimpleLight} />
                <Drawer.Items>
                    <EditUser
                        user={
                            typeof edit === 'number'
                                ? users?.find((user) => user.id === edit)
                                : undefined
                        }
                        editUser={editUser}
                    />
                </Drawer.Items>
            </Drawer>
            <Drawer open={del !== false} onClose={() => setDelete(false)} position='right'>
                <Drawer.Header title='Eliminar un usuario' titleIcon={PiTrashLight} />
                <Drawer.Items>
                    <DeleteUser id={typeof del === 'number' ? del : 0} removeUser={removeUser} />
                </Drawer.Items>
            </Drawer>
        </Card>
    )
}

export default UsersPage
