import { FC, useEffect, useState } from 'react'
import {
    Button,
    TextInput,
    Table,
    Checkbox,
    Pagination,
    Select,
    Modal,
    Drawer,
} from 'flowbite-react'
import {
    PiPlusLight,
    PiMagnifyingGlassLight,
    PiPencilSimpleLight,
    PiTrashLight,
} from 'react-icons/pi'

import IconLink from '../iconLink'
import { Field, FormConfigure } from '../types/dynamicForm'
import { ObjectLiteral } from '../../utils/types'

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

interface Props {
    data: ObjectLiteral<string | number | boolean>[]
    config: FormConfigure
}

const DynamicForm: FC<Props> = ({ data, config }) => {
    const actions = Object.keys(config.titles)

    // Tables
    const [totalPages, setTotalPages] = useState(Math.ceil(data.length / 5))
    const [dataFilter, setDataFilter] = useState(data)
    const [dataShowing, setDataShowing] = useState<ObjectLiteral<string | number | boolean>[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [elementsPerPage, setElementsPerPage] = useState(5)
    const [rows, setRows] = useState<Field[]>([])
    const [checkedState, setCheckedState] = useState(new Array(data.length).fill(false))
    const [countSelect, setCountSelect] = useState(0)
    const [disabledSearchInput, setDisabledSearchInput] = useState(false)
    const [textSearch, setTextSearch] = useState('')

    //Modals
    const [isCreate, setIsCreate] = useState(false)

    useEffect(() => {
        let elements = []
        if (config.type === 'tabs') {
            elements = config.tabs[0].groups[0].fields
        } else if (config.type === 'drawer') {
            elements = config.data
        } else {
            elements = config.data[0].fields
        }

        setRows(elements)
    }, [])

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
            return rows.some(
                (row) =>
                    element[row.name].toString().toLowerCase().indexOf(textSearch.toLowerCase()) !==
                    -1,
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
                        {actions.includes('edit') ? (
                            <IconLink
                                disabled={countSelect > 1}
                                icon={PiPencilSimpleLight}
                                link='#'
                                size={24}
                            />
                        ) : (
                            <></>
                        )}
                        {actions.includes('delete') ? (
                            <IconLink icon={PiTrashLight} link='#' size={24} />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                {actions.includes('create') && (
                    <div className='col-span-1 lg:col-span-3 flex items-center justify-end'>
                        <Button size='sm' className='text-sm' onClick={() => setIsCreate(true)}>
                            <PiPlusLight className='mr-1 h-5 w-5' />
                            Nuevo
                        </Button>
                    </div>
                )}
            </div>
            <div className='mt-3'>
                <div className='overflow-x-scroll lg:overflow-x-hidden'>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className='p-4'>
                                <Checkbox />
                            </Table.HeadCell>
                            {rows.map((row, index) => (
                                <Table.HeadCell className='capitalize' key={`TableHead${index}`}>
                                    {row.label}
                                </Table.HeadCell>
                            ))}
                            <Table.HeadCell>
                                <span className='sr-only'>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y' key='TableBody'>
                            {dataShowing.map((element, indexData) => (
                                <Table.Row
                                    key={`TableRow${indexData}`}
                                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                                >
                                    <Table.Cell className='p-4' key={`TableCellHead${indexData}`}>
                                        <Checkbox
                                            checked={checkedState[indexData]}
                                            onChange={() => handleOnChange(indexData)}
                                        />
                                    </Table.Cell>
                                    {rows.map((row, indexRow) => (
                                        <>
                                            <Table.Cell key={`TableCell${indexRow}`}>
                                                {element[row.name]}
                                            </Table.Cell>
                                        </>
                                    ))}
                                    <Table.Cell
                                        className='flex gap-2'
                                        key={`TableCellBody${indexData}`}
                                    >
                                        {actions.includes('edit') ? (
                                            <div className='col-span-3 flex items-center justify-end'>
                                                <Button color='light' size='xs' className='text-sm'>
                                                    <PiMagnifyingGlassLight className='mr-1 h-5 w-5' />
                                                </Button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        {actions.includes('edit') ? (
                                            <div className='col-span-3 flex items-center justify-end'>
                                                <Button color='light' size='xs' className='text-sm'>
                                                    <PiPencilSimpleLight className='mr-1 h-5 w-5' />
                                                </Button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        {actions.includes('delete') ? (
                                            <div className='col-span-3 flex items-center justify-end'>
                                                <Button color='light' size='xs' className='text-sm'>
                                                    <PiTrashLight className='mr-1 h-5 w-5' />
                                                </Button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
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
            {config.type === 'drawer' && (
                <Drawer open={isCreate} onClose={() => setIsCreate(false)} position='right'>
                    <Drawer.Header title={config.titles.create} titleIcon={PiPlusLight} />
                    <Drawer.Items>{/* <FormDrawer fields={config.data}/> */}</Drawer.Items>
                </Drawer>
            )}
            {/* Modal Add New Element */}
            {actions.includes('create') && config.type === 'modal' && (
                <Modal show={isCreate} onClose={() => setIsCreate(false)}>
                    <Modal.Header>{config.titles.create}</Modal.Header>
                    <Modal.Body></Modal.Body>
                    <Modal.Footer className='justify-between'>
                        <Button size='sm' color='gray' onClick={() => setIsCreate(false)}>
                            Cancelar
                        </Button>
                        <Button size='sm' onClick={() => setIsCreate(false)}>
                            Agregar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default DynamicForm
