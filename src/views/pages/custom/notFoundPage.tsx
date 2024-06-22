import { FC } from 'react'
import { Button } from 'flowbite-react'
import { HiOutlineArrowLeft } from 'react-icons/hi'

const NotFoundPage: FC = () => {
    return (
        <div className='flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900'>
            <div className='block md:max-w-lg'>
                <img
                    src='https://flowbite-admin-dashboard.vercel.app/images/illustrations/404.svg'
                    alt='astronaut'
                />
            </div>
            <div className='text-center xl:max-w-4xl'>
                <h1 className='mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white'>
                    Pagina no encontrada
                </h1>
                <p className='mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400'>
                    ¡Ups! Parece que seguiste un enlace incorrecto. Si crees que esto es un problema
                    con nosotros, por favor comuníquese con nosotros.
                </p>
                <Button href='/' className='m-auto w-fit'>
                    <HiOutlineArrowLeft size={20} className='mr-2' />
                    Ir al inicio
                </Button>
            </div>
        </div>
    )
}

export default NotFoundPage
