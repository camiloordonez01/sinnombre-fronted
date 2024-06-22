import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Dropdown, Avatar, DarkThemeToggle, Tooltip } from 'flowbite-react'
import { BsBellFill } from 'react-icons/bs'
import { CgMenuLeftAlt, CgClose } from 'react-icons/cg'

// Store
import { AppDispatch, Reducers } from '../../store'
import { setUser } from '../../store/slices/userState'
import { setSidebarShowing, pushNotification } from '../../store/slices/appState'

import { LOGIN } from '../../utils/constants'

const Header: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { names, email, avatar } = useSelector((state: Reducers) => state.userState)
    const [sidebarShow, setSidebarShow] = useState(false)

    useEffect(() => {
        dispatch(setSidebarShowing(sidebarShow))
    }, [dispatch, sidebarShow])

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(setUser({ names: '', email: '', avatar: '' }))
        dispatch(pushNotification({ type: 'success', message: 'Se cerro sesión correctamente.' }))
        navigate(LOGIN)
    }

    return (
        <nav className='fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
            <div className='px-3 py-3 lg:px-5 lg:pl-3'>
                <div className='flex items-center justify-between'>
                    <button
                        id='toggleSidebarMobile'
                        aria-expanded='true'
                        aria-controls='sidebar'
                        className='p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        onClick={() => setSidebarShow(!sidebarShow)}
                    >
                        <CgMenuLeftAlt
                            id='toggleSidebarMobileHamburger'
                            className={`${!sidebarShow ? '' : 'hidden'}`}
                            size={20}
                        />
                        <CgClose
                            id='toggleSidebarMobileClose'
                            className={`${sidebarShow ? '' : 'hidden'}`}
                            size={20}
                        />
                    </button>
                    <div className='flex items-center justify-start'>Logo</div>
                    <div className='flex items-center gap-3'>
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <div className='rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'>
                                    <BsBellFill size={20} />
                                </div>
                            }
                        >
                            <Dropdown.Header>Notificaciones</Dropdown.Header>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
                        </Dropdown>
                        <Tooltip content='Cambiar tema'>
                            <DarkThemeToggle />
                        </Tooltip>
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={<Avatar alt='User settings' img={avatar} rounded />}
                        >
                            <Dropdown.Header>
                                <span className='block text-sm'>{names}</span>
                                <span className='block truncate text-sm font-medium'>{email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
