import { FC, memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Toast } from 'flowbite-react'
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi'

import { deleteNotification } from '../../store/slices/appState'
import { Notification } from '../../store/types/slices'
import { AppDispatch } from '../../store'

const ToastNotification: FC<Notification> = (props) => {
    const dispatch = useDispatch<AppDispatch>()

    const [showToast, setShowToast] = useState(false)
    const [classes, setClasses] = useState('')
    const [icon, setIcon] = useState(<HiCheck className='h-5 w-5' />)
    const [bgLoader, setBgLoader] = useState('')

    useEffect(() => {
        if (props.type === 'success') {
            setIcon(<HiCheck className='h-5 w-5' />)
            setClasses('bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200')
            setBgLoader('bg-green-500')
        } else if (props.type === 'danger') {
            setIcon(<HiX className='h-5 w-5' />)
            setClasses('bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200')
            setBgLoader('bg-red-500')
        } else {
            setIcon(<HiExclamation className='h-5 w-5' />)
            setClasses('bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200')
            setBgLoader('bg-cyan-500')
        }
        setShowToast(true)
    }, [])

    useEffect(() => {
        if (showToast) {
            setTimeout(dispatch, 5000, deleteNotification())
        }
    }, [showToast])

    return (
        <>
            {showToast && (
                <Toast className='relative mt-3 z-30'>
                    <div
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${classes}`}
                    >
                        {icon}
                    </div>
                    <div className='ml-3 text-sm font-normal'>{props.message}</div>
                    <Toast.Toggle onDismiss={() => setShowToast(false)} />
                    <hr
                        className={`absolute left-0 bottom-0 h-1 rounded-bl-lg rounded-br-lg transition ease-in-out delay-150 progressHrToast ${bgLoader}`}
                    />
                </Toast>
            )}
        </>
    )
}

export default memo(ToastNotification)
