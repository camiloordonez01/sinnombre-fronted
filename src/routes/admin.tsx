import { RouteObject } from 'react-router-dom'
import AdminLayout from '../layout/admin'
import PagesLayout from '../layout/pages'
import { DashboardPage } from '../views/pages/admin'
import { UsersAll } from '../views/pages/admin/users'

import { BASE, DASHBOARD, MUSIC_CONFIG, USERS } from '../utils/constants'
import { MusicConfig } from '../views/pages/admin/music'

const routesAdmin: RouteObject = {
    path: BASE,
    element: <AdminLayout />,
    children: [
        {
            path: '/',
            element: <PagesLayout />,
            children: [
                {
                    path: USERS,
                    element: <UsersAll />,
                },
                {
                    path: MUSIC_CONFIG,
                    element: <MusicConfig />,
                },
            ],
        },
        {
            path: DASHBOARD,
            element: <DashboardPage />,
        },
    ],
}

export default routesAdmin
