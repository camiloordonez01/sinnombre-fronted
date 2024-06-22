import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Button, Card } from 'flowbite-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import FieldConfig from '../../../../components/fieldConfig'

import { Config, Parameter } from '../../../../services/types/utils'
import {
    getParameterValuesByModule,
    getParametersByModule,
    saveParametersByModule,
} from '../../../../services/utils'
import { ObjectLiteral } from '../../../../utils/types'

import { AppDispatch } from '../../../../store'
import { pushNotification } from '../../../../store/slices/appState'

interface ParentsData {
    key: string
    value: string
}
const MusicConfig: FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const parametersRef = useRef<Map<string, HTMLDivElement>>(new Map())
    const [parameters, setParameters] = useState<Parameter[]>()
    const [parameterValue, setParameterValue] = useState<ObjectLiteral<string>>()
    const [submit, setSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const parents = new Map<string, ParentsData[]>()
    const parametersMap = new Map<string, Parameter>()

    const {
        handleSubmit,
        register,
        getValues,
        control,
        setError,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (!parameters) {
            get()
        }
    }, [])

    const get = useCallback(async () => {
        const getParameterValues = await getParameterValuesByModule('music')
        if (getParameterValues && getParameterValues.status === 'SUCCESS') {
            const newValues: ObjectLiteral<string> = {}

            getParameterValues.result.forEach((value) => {
                newValues[value.code] = value.value
            })
            setParameterValue(newValues)
        }

        const getParameters = await getParametersByModule('music')
        if (getParameters && getParameters.status === 'SUCCESS') {
            setParameters(getParameters.result)
        }

        setIsLoading(false)
    }, [])

    const setRefParameters = (node: HTMLDivElement | null, code: string) => {
        if (node) {
            parametersRef.current.set(code, node)
        } else {
            parametersRef.current.delete(code)
        }
    }

    const setDisplayParameter = (code: string, isVisible: boolean) => {
        const element = parametersRef.current.get(code)
        if (element) {
            element.style.setProperty('display', isVisible ? 'grid' : 'none')
        }
    }

    const validateDependencies = (code: string) => {
        const parentsData = parents.get(code)
        if (parentsData) {
            const data = getValues(code)
            parentsData.forEach((parent) => {
                if (String(parent.value) === String(data)) {
                    setDisplayParameter(parent.key, true)
                } else {
                    setDisplayParameter(parent.key, false)
                }
            })
        }
    }

    const getRowTable = (parameter: Parameter, index: number) => {
        let isDisplay = true

        const { code, description, dependenceParameterCode, dependenceParameterValue } = parameter

        if (!parents.has(code)) {
            parents.set(code, [])
        }

        parametersMap.set(code, parameter)

        if (dependenceParameterCode && dependenceParameterValue) {
            if (
                !parameterValue?.[dependenceParameterCode] &&
                parametersMap.has(dependenceParameterCode) &&
                parametersMap.get(dependenceParameterCode)?.defaultValue != dependenceParameterValue
            ) {
                isDisplay = false
            }

            if (
                parameterValue &&
                parameterValue[dependenceParameterCode] != dependenceParameterValue
            ) {
                isDisplay = false
            }

            parents.set(dependenceParameterCode, [
                ...(parents.get(dependenceParameterCode) ?? []),
                { key: code, value: dependenceParameterValue },
            ])
        }

        return (
            <div
                key={`TableRowConfigUser${index}`}
                ref={(node) => setRefParameters(node, code)}
                style={{ display: isDisplay ? 'grid' : 'none' }}
                className='grid grid-cols-4 gap-6 items-center mb-5 pb-5 border-b-2 bg-white dark:border-gray-700 dark:bg-gray-800'
            >
                <FieldConfig
                    parameter={parameter}
                    val={parameterValue && parameterValue[code]}
                    disabled={submit}
                    control={control}
                    errors={errors}
                    register={register}
                    validateDependencies={validateDependencies}
                />
                <div className='col-span-3'>
                    <p className=' dark:text-white'>{description}</p>
                </div>
            </div>
        )
    }

    const onSubmit: SubmitHandler<ObjectLiteral<string>> = async () => {
        setSubmit(true)

        let errors = false
        const configData: Config[] = []
        parametersRef.current.forEach((ref, key) => {
            if (
                ref.style.display !== 'none' &&
                parametersMap.get(key)?.notNull &&
                getValues(key) === ''
            ) {
                errors = true
                setError(key, { type: 'custom', message: 'El parámetro no puede estar vació' })
            } else if (ref.style.display !== 'none') {
                const data = getValues(key)
                configData.push({ code: key, value: Array.isArray(data) ? data.join(',') : data })
            }
        })

        setSubmit(false)
        if (errors) {
            setSubmit(false)
        } else {
            const saveParameters = await saveParametersByModule('music', configData)

            if (saveParameters && saveParameters.status === 'SUCCESS') {
                setSubmit(false)
                dispatch(
                    pushNotification({
                        type: 'success',
                        message: 'Se guardo la configuración correctamente.',
                    }),
                )
            } else if (saveParameters && saveParameters.status === 'ERROR') {
                setSubmit(false)
                dispatch(
                    pushNotification({
                        type: 'danger',
                        message: 'Ha ocurrido un error, por favor vuelva a intentarlo.',
                    }),
                )
            }
        }
    }

    return (
        <Card style={{ minHeight: 'calc(100vh - 228px)' }}>
            <h1 className='text-lg font-semibold text-gray-900 sm:text-xl dark:text-white mb-2'>
                Configuración para el modulo del control de la música
            </h1>
            {isLoading && <div className='loader center'></div>}
            <form onSubmit={handleSubmit(onSubmit)} className={`${isLoading && 'hidden'}`}>
                <div>
                    {parameters &&
                        parameterValue &&
                        parameters.map((parameter, index) => getRowTable(parameter, index))}
                </div>
                <div className='mt-6'>
                    <Button
                        type='submit'
                        className='float-end'
                        disabled={submit}
                        isProcessing={submit}
                    >
                        Guardar
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default MusicConfig
