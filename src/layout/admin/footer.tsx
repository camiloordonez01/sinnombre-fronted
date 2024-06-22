import { FC } from 'react'
import { Footer } from 'flowbite-react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'

const FooterA: FC = () => {
    return (
        <Footer className='mt-4'>
            <div className='w-full'>
                <div className='w-full px-4 py-6 sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href='#' by='sinnombre™' year={2024} />
                    <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
                        <Footer.Icon href='#' icon={BsFacebook} />
                        <Footer.Icon href='#' icon={BsInstagram} />
                        <Footer.Icon href='#' icon={BsTwitter} />
                        <Footer.Icon href='#' icon={BsGithub} />
                        <Footer.Icon href='#' icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterA
