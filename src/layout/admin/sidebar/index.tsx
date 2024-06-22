import { FC } from 'react'
import { useSelector } from 'react-redux'

// Store
import { Reducers } from '../../../store'

import Menu from './menu'
import FooterMenu from './footerMenu'

const Sidebar: FC = () => {
    const { sidebarShowing } = useSelector((state: Reducers) => state.appState)
    return (
        <>
            <aside
                id='sidebar'
                className={`fixed top-0 left-0 z-20 flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width ${sidebarShowing ? '' : 'hidden'}`}
                aria-label='Sidebar'
            >
                <div className='relative flex flex-col flex-1 h-full pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                    <div className='flex flex-col flex-1 pt-5 pb-4 overflow-y-auto overflow-x-hidden'>
                        <Menu />
                    </div>
                    <div className='absolute bottom-0 left-0 justify-center hidden w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800'>
                        <FooterMenu />
                    </div>
                </div>
            </aside>
            <div
                className={`lg:hidden inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90 ${sidebarShowing ? 'fixed' : 'hidden'}`}
            ></div>
        </>
    )
}

export default Sidebar
