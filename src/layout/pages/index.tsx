import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderPage from './header'

const PagesLayout: FC = () => {
    return (
        <div className='min-w-[-webkit-fill-available] lg:min-w-full'>
            <HeaderPage />
            <Outlet />
        </div>
    )
}

export default PagesLayout
