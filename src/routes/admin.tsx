import { RouteObject } from 'react-router-dom'
import AdminLayout from '../layout/admin'
import PagesLayout from '../layout/pages'
import { DashboardPage } from '../views/pages/admin'
import { BASE, DASHBOARD, USERS, MUSIC_CONFIG, MUSIC_PLAYLIST } from '../utils/constants'

import { UsersAll } from '../views/pages/admin/users'
import { MusicConfig, MusicPlaylist } from '../views/pages/admin/music'

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
                {
                    path: MUSIC_PLAYLIST,
                    element: <MusicPlaylist />,
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
