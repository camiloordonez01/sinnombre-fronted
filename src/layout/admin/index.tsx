import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Flowbite, CustomFlowbiteTheme } from 'flowbite-react'

import { LOGIN } from '../../utils/constants'

import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'

const customTheme: CustomFlowbiteTheme = {}

const AdminLayout: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate(LOGIN)
        }
    }, [])
    return (
        <Flowbite theme={{ theme: customTheme }}>
            <div className='bg-gray-50 dark:bg-gray-800'>
                <Header />
                <div className='flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900'>
                    <Sidebar />
                    <div
                        id='main-content'
                        className='relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900'
                    >
                        <main
                            className='grid content-between pt-6 pb-4 px-4'
                            style={{ minHeight: 'calc(100vh - 64px)' }}
                        >
                            <Outlet />
                            <Footer />
                        </main>
                    </div>
                </div>
            </div>
        </Flowbite>
    )
}

export default AdminLayout
