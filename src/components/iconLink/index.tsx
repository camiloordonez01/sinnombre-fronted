import { Button, ButtonProps } from 'flowbite-react'
import { FC } from 'react'
import { IconType } from 'react-icons'

interface Props {
    link: string
    icon: IconType
    size?: number
    disabled?: boolean
}
const IconLink: FC<Props & ButtonProps> = (props) => {
    return (
        <Button
            disabled={props.disabled}
            href={props.link}
            color='light'
            size='xs'
            className='text-sm'
            {...props}
        >
            <props.icon size={props.size ?? 6} />
        </Button>
    )
}

export default IconLink
