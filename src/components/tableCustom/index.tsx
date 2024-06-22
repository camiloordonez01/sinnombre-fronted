import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Button, TextInput, Table, Checkbox, Pagination, Select, Avatar } from 'flowbite-react'
import {
    PiPlusLight,
    PiMagnifyingGlassLight,
    PiPencilSimpleLight,
    PiTrashLight,
} from 'react-icons/pi'

import IconLink from '../iconLink'

const theme = {
    base: '',
    pages: {
        base: 'xs:mt-0 mt-2 inline-flex items-stretch -space-x-px',
        showIcon: 'inline-flex',
        previous: {
            base: 'flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
            icon: 'h-5 w-5',
        },
        next: {
            base: 'flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
            icon: 'h-5 w-5',
        },
        selector: {
            base: 'text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
            active: 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
            disabled: 'cursor-not-allowed opacity-50',
        },
    },
}

interface Columns {
    name: string
    label: string
    type: string
}
interface Props {
    data: any[]
    columns: Columns[]
    actions: string[]
    dispatchView?: Dispatch<SetStateAction<boolean | number>>
    dispatchCreate?: Dispatch<SetStateAction<boolean>>
    dispatchEdit?: Dispatch<SetStateAction<boolean | number>>
    dispatchDelete?: Dispatch<SetStateAction<boolean | number>>
}

const TableCustom: FC<Props> = ({
    data,
    columns,
    actions,
    dispatchView,
    dispatchCreate,
    dispatchEdit,
    dispatchDelete,
}) => {
    // Tables
    const [totalPages, setTotalPages] = useState(Math.ceil(data.length / 5))
    const [dataFilter, setDataFilter] = useState(data)
    const [dataShowing, setDataShowing] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [elementsPerPage, setElementsPerPage] = useState(5)
    const [checkedState, setCheckedState] = useState(new Array(data.length).fill(false))
    const [countSelect, setCountSelect] = useState(0)
    const [disabledSearchInput, setDisabledSearchInput] = useState(false)
    const [textSearch, setTextSearch] = useState('')

    useEffect(() => {
        setDataFilter(data)
        setTotalPages(Math.ceil(data.length / 5))
        setDataShowing([])
        setCurrentPage(1)
        setElementsPerPage(5)
        setCheckedState(new Array(data.length).fill(false))
        setCountSelect(0)
        setDisabledSearchInput(false)
        setTextSearch('')
    }, [data])

    useEffect(() => {
        setDataShowing(
            dataFilter.slice(
                currentPage * elementsPerPage - elementsPerPage,
                currentPage * elementsPerPage,
            ),
        )
    }, [currentPage, elementsPerPage, dataFilter])

    useEffect(() => {
        setTotalPages(Math.ceil(dataFilter.length / elementsPerPage))
    }, [elementsPerPage])

    useEffect(() => {
        if (textSearch === '') {
            setElementsPerPage(5)
            setCurrentPage(1)
            setTotalPages(Math.ceil(data.length / elementsPerPage))
            setDataFilter(data)
        }
    }, [textSearch])

    const onPageChange = (page: number) => setCurrentPage(page)

    const handleOnChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item,
        )

        setCheckedState(updatedCheckedState)

        const total = updatedCheckedState.reduce((sum, currentState) => {
            if (currentState === true) {
                return sum + 1
            }
            return sum
        }, 0)

        setCountSelect(total)
    }

    const handleOnSearch = () => {
        setDisabledSearchInput(true)

        const dataSearch = data.filter((element) => {
            return columns.some(
                (column) =>
                    element[column.name]
                        .toString()
                        .toLowerCase()
                        .indexOf(textSearch.toLowerCase()) !== -1,
            )
        })

        setElementsPerPage(5)
        setCurrentPage(1)
        setTotalPages(Math.ceil(dataSearch.length / elementsPerPage))
        setDataFilter(dataSearch)
        setDisabledSearchInput(false)
    }

    return (
        <>
            <div className='grid grid-cols-2 lg:grid-cols-10 md:divide-x md:divide-gray-100 dark:divide-gray-700'>
                <div className='col-span-2 lg:col-span-4 lg:mb-0 mb-3 relative'>
                    <TextInput
                        icon={PiMagnifyingGlassLight}
                        type='text'
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.currentTarget.value)}
                        placeholder='Escribe para buscar'
                        onKeyDown={(e) =>
                            e.key === 'Enter' && e.currentTarget.value !== ''
                                ? handleOnSearch()
                                : undefined
                        }
                        disabled={disabledSearchInput}
                    />
                    <Button
                        disabled={textSearch === ''}
                        isProcessing={disabledSearchInput}
                        className='rounded-l-none absolute top-0 right-0'
                        onClick={handleOnSearch}
                    >
                        Buscar
                    </Button>
                </div>
                <div className='col-span-1 lg:col-span-3 flex items-center w-full justify-start'>
                    <div className='flex pl-2 space-x-1'>
                        {actions.includes('edit') && dispatchEdit && (
                            <IconLink
                                disabled={countSelect > 1}
                                icon={PiPencilSimpleLight}
                                link='#'
                                size={24}
                            />
                        )}
                        {actions.includes('delete') && dispatchDelete && (
                            <IconLink icon={PiTrashLight} link='#' size={24} />
                        )}
                    </div>
                </div>
                {actions.includes('create') && dispatchCreate && (
                    <div className='col-span-1 lg:col-span-3 flex items-center justify-end'>
                        <Button size='sm' className='text-sm' onClick={() => dispatchCreate(true)}>
                            <PiPlusLight className='mr-1 h-5 w-5' />
                            Nuevo
                        </Button>
                    </div>
                )}
            </div>
            <div className='mt-3'>
                <div className='overflow-x-scroll lg:overflow-x-hidden'>
                    <Table hoverable key='TableCustom'>
                        <Table.Head key='TableHeadCustom'>
                            <Table.HeadCell className='p-4' key='TableCellCustom1'>
                                <Checkbox />
                            </Table.HeadCell>
                            {columns.map((column, index) => (
                                <Table.HeadCell className='capitalize' key={`TableHead${index}`}>
                                    {column.label}
                                </Table.HeadCell>
                            ))}
                            <Table.HeadCell key='TableCellCustom2'>
                                <span className='sr-only'>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y' key='TableBodyCustom'>
                            {dataShowing.length > 0 ? (
                                dataShowing.map((element, indexData) => (
                                    <Table.Row
                                        key={`TableRow${indexData}`}
                                        className='bg-white dark:border-gray-700 dark:bg-gray-800'
                                    >
                                        <Table.Cell
                                            className='p-4'
                                            key={`TableCellHead${indexData}`}
                                        >
                                            <Checkbox
                                                key={`CheckCellHead${indexData}`}
                                                checked={checkedState[indexData]}
                                                onChange={() => handleOnChange(indexData)}
                                            />
                                        </Table.Cell>
                                        {columns.map((column, indexColumn) => (
                                            <>
                                                <Table.Cell key={`TableCell${indexColumn}`}>
                                                    {column.type === 'text' ? (
                                                        element[column.name]
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {column.type === 'image' && (
                                                        <Avatar
                                                            alt='imageTable'
                                                            key={`AvatarCellHead${indexData}`}
                                                            img={
                                                                element[column.name] ??
                                                                `/avatar.png`
                                                            }
                                                        />
                                                    )}
                                                </Table.Cell>
                                            </>
                                        ))}
                                        <Table.Cell
                                            className='flex gap-2'
                                            key={`TableCellBody${indexData}`}
                                        >
                                            {actions.includes('view') && dispatchView && (
                                                <div className='col-span-3 flex items-center justify-end'>
                                                    <Button
                                                        color='light'
                                                        size='xs'
                                                        className='text-sm'
                                                        onClick={() => dispatchView(element.id)}
                                                    >
                                                        <PiMagnifyingGlassLight className='mr-1 h-5 w-5' />
                                                    </Button>
                                                </div>
                                            )}
                                            {actions.includes('edit') && dispatchEdit && (
                                                <div className='col-span-3 flex items-center justify-end'>
                                                    <Button
                                                        color='light'
                                                        size='xs'
                                                        className='text-sm'
                                                        onClick={() => dispatchEdit(element.id)}
                                                    >
                                                        <PiPencilSimpleLight className='mr-1 h-5 w-5' />
                                                    </Button>
                                                </div>
                                            )}
                                            {actions.includes('delete') && dispatchDelete && (
                                                <div className='col-span-3 flex items-center justify-end'>
                                                    <Button
                                                        color='light'
                                                        size='xs'
                                                        className='text-sm'
                                                        onClick={() => dispatchDelete(element.id)}
                                                    >
                                                        <PiTrashLight className='mr-1 h-5 w-5' />
                                                    </Button>
                                                </div>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 text-center'>
                                    <Table.Cell key='TableRowEmpty' colSpan={columns.length + 2}>
                                        No existen datos para mostrar
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </div>
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-center mt-3'>
                    <div className='text-center lg:text-left'>
                        <p className='pr-3 font-light text-gray-700 dark:text-slate-400'>
                            Mostrando{' '}
                            <span className='font-semibold'>
                                {currentPage * elementsPerPage - elementsPerPage + 1}
                            </span>{' '}
                            a&nbsp;
                            <span className='font-semibold'>
                                {currentPage * elementsPerPage}
                            </span>{' '}
                            de&nbsp;
                            <span className='font-semibold'>{dataFilter.length}</span> registros
                        </p>
                    </div>
                    <div className='xl:col-span-3 flex items-center justify-self-center lg:justify-self-end text-sm text-gray-700 dark:text-gray-400'>
                        <label className='pr-3' htmlFor='rows'>
                            Filas por pagina
                        </label>
                        <Select
                            value={elementsPerPage}
                            onChange={(e) => setElementsPerPage(Number(e.target.value))}
                            id='rows'
                            className='pr-3'
                        >
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='30'>30</option>
                            <option value='40'>40</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                            <option value='all'>All</option>
                        </Select>
                    </div>
                    <div className='col-span-2 lg:col-span-1 mt-3 lg:mt-0 text-center lg:text-right'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            showIcons
                            nextLabel=''
                            previousLabel=''
                            theme={theme}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableCustom
