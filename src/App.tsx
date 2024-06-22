import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { Reducers } from './store'
import router from './routes'
import ToastNotification from './components/toastNotification'

const App: FC = () => {
    const { notifications } = useSelector((state: Reducers) => state.appState)

    return (
        <div className='App'>
            <RouterProvider router={router} />
            <div className='absolute right-5 bottom-5'>
                {notifications.map((notification, index) => (
                    <ToastNotification key={`toastNotification${index}`} {...notification} />
                ))}
            </div>
        </div>
    )
}

export default App
