import { RouteObject } from 'react-router-dom'
import { LoginPage } from '../views/pages/auth'

import { LOGIN } from '../utils/constants'

const routesAuth: RouteObject = {
    path: LOGIN,
    element: <LoginPage />,
}

export default routesAuth
