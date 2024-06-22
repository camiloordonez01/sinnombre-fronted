import { FC } from 'react'
import { BsDribbble } from 'react-icons/bs'

const FooterMenu: FC = () => {
    return (
        <>
            <a
                href='http://localhost'
                className='inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
            >
                <BsDribbble width={6} height={6} />
            </a>
        </>
    )
}

export default FooterMenu
