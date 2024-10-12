import { FC, useCallback, useEffect, useState } from 'react'
import { Avatar, Button, Card, Drawer, FileInput, Label, TextInput } from 'flowbite-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { HiOutlinePlus, HiPlay, HiXMark } from 'react-icons/hi2'

const theme = {
    root: {
        base: 'flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
        children: 'flex h-full flex-col gap-4 p-6',
        horizontal: {
            off: 'flex-col',
            on: 'flex-col md:max-w-xl md:flex-row',
        },
        href: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    },
    img: {
        base: '',
        horizontal: {
            off: 'rounded-t-lg',
            on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
        },
    },
}

const data = [
    {
        name: 'Principal',
        image: 'https://lh3.googleusercontent.com/oTpKt1_T3kN0c_0N6zDfbE84d95Ft6BlqPfdsUQsJqnJoDxLyy48honVK66SglRoK1pdyJXvJSSd1io=w226-h226-l90-rj',
        countSongs: 5,
    },
    {
        name: 'Secundario',
        image: 'https://lh3.googleusercontent.com/lPa0bht1MdqrSYCmRqIfIiAiXrZnh61bl7iiSi_3AxdAcp7ga623I_zC5B-qF1W4ybt1xbzCd23wJYY=w226-h226-l90-rj',
        countSongs: 14,
    },
    {
        name: 'Alternativo',
        image: 'https://lh3.googleusercontent.com/PDit50Nmvm_u9eaZQ8wSxalf4_hYKOG7F0_yKk4IIHpYlW65xQsfXOlL8TwkrdfZhnGwPhHFhV8mWkdc=w226-h226-l90-rj',
        countSongs: 35,
    },
]

interface Playlist {
    name: string
    image: string
    countSongs: number
}

type Inputs = {
    name: string
    image?: string
}

const MusicPlaylist: FC = () => {
    const [submitAddPlaylist, setSubmitAddPlaylist] = useState(false)
    const [playlists, setPlaylists] = useState<Playlist[]>()
    const [isOpenDrawerAddPlaylist, setIsOpenDrawerAddPlaylist] = useState(false)
    const {
        handleSubmit,
        register,
        //setError,
        formState: { errors },
        reset,
    } = useForm<Inputs>()

    useEffect(() => {
        if (!playlists) {
            loadData()
        }
    }, [])

    const loadData = useCallback(async () => {
        setPlaylists(data)
    }, [])

    const createPlaylist = () => {
        setIsOpenDrawerAddPlaylist(true)
    }

    const showPlaylist = (idPlaylist: number) => {
        console.log(idPlaylist)
    }

    const onSubmit: SubmitHandler<Inputs> = async (info) => {
        setSubmitAddPlaylist(true)
        data.push({
            name: info.name,
            image: 'https://lh3.googleusercontent.com/PDit50Nmvm_u9eaZQ8wSxalf4_hYKOG7F0_yKk4IIHpYlW65xQsfXOlL8TwkrdfZhnGwPhHFhV8mWkdc=w226-h226-l90-rj',
            countSongs: 0,
        })

        setPlaylists(data)
        reset()
        setSubmitAddPlaylist(false)
        setIsOpenDrawerAddPlaylist(false)
    }

    return (
        <>
            <div className='grid grid-cols-4 gap-4'>
                <Card className='max-w-sm overflow-x-auto' style={{ height: 'calc(100vh - 228px)' }} theme={theme}>
                    <div className='mb-4 flex items-center justify-between'>
                        <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
                            Listas
                        </h5>
                        <button
                            className='text-lg font-medium hover:underline'
                            onClick={() => createPlaylist()}
                        >
                            <HiOutlinePlus />
                        </button>
                    </div>
                    <div className='flow-root'>
                        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                            {playlists ? (
                                playlists.map((playlist, index) => (
                                    <li
                                        className='py-3 sm:py-4 cursor-pointer'
                                        key={`itemPlaylist${index}`}
                                    >
                                        <div className='w-full flex justify-between'>
                                            <button onClick={() => showPlaylist(1)}>
                                                <div className='flex space-x-4'>
                                                    <div className='flex items-center min-w-0 flex-1'>
                                                        <Avatar className='mr-3' img={playlist.image} />
                                                        <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                                                            {playlist.name}
                                                        </p>
                                                    </div>
                                                    <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                                                        {playlist.countSongs}
                                                    </div>
                                                </div>
                                            </button>
                                            <button>
                                                <HiXMark />
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li>No hay listas de reproducción</li>
                            )}
                        </ul>
                    </div>
                </Card>
                <Card className='col-span-3'></Card>
            </div>
            <Drawer
                open={isOpenDrawerAddPlaylist}
                onClose={() => setIsOpenDrawerAddPlaylist(false)}
                position='right'
            >
                <Drawer.Header title='Nueva lista' titleIcon={HiPlay} />
                <Drawer.Items>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-6 mt-3'>
                            <Label htmlFor='name' className='mb-2 block'>
                                Titulo
                            </Label>
                            <TextInput
                                id='name'
                                color={errors.name && 'failure'}
                                disabled={submitAddPlaylist}
                                {...register('name', { required: true })}
                            />
                            {errors.name && (
                                <Label color='failure' className='text-xs'>
                                    Este campo es requerido
                                </Label>
                            )}
                        </div>
                        <div className='mb-6'>
                            <div>
                                <Label
                                    htmlFor='file-upload-helper-text'
                                    value='Subir imagen (Opcional)'
                                />
                            </div>
                            <FileInput
                                color={errors.image && 'failure'}
                                disabled={submitAddPlaylist}
                                {...register('image', { required: false })}
                                id='file-upload-helper-text'
                                helperText='PNG o JPG (MAX. 800x800px).'
                            />
                        </div>
                        <Button
                            className='w-full'
                            type='submit'
                            disabled={submitAddPlaylist}
                            isProcessing={submitAddPlaylist}
                        >
                            Crear lista
                        </Button>
                    </form>
                </Drawer.Items>
            </Drawer>
        </>
    )
}

export default MusicPlaylist
