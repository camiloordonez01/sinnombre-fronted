import Axios, { AxiosError } from 'axios'
import { ErrorResponse, SuccessResponse } from './types'
import { Parameter, ModulesCode, Config } from './types/utils'

const { REACT_APP_DEV_ENDPOINT_API } = process.env

export const getParametersByModule = async (module: ModulesCode) => {
    try {
        const { data } = await Axios.get<SuccessResponse<Parameter[]>>(
            `${REACT_APP_DEV_ENDPOINT_API}/utils/parameters/${module}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            },
        )

        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ErrorResponse
        }
    }
}

export const getParameterValuesByModule = async (module: ModulesCode) => {
    try {
        const { data } = await Axios.get<SuccessResponse<Config[]>>(
            `${REACT_APP_DEV_ENDPOINT_API}/utils/parameters/${module}/values`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            },
        )

        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ErrorResponse
        }
    }
}

export const saveParametersByModule = async (module: ModulesCode, config: Config[]) => {
    try {
        const { data } = await Axios.post<SuccessResponse<boolean>>(
            `${REACT_APP_DEV_ENDPOINT_API}/utils/parameters/${module}`,
            { config },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            },
        )

        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ErrorResponse
        }
    }
}
