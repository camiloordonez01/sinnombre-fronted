import Axios, { AxiosError } from 'axios'
import { ErrorResponse, SuccessResponse } from './types'
import { User, Role } from './types/users'

const { REACT_APP_DEV_ENDPOINT_API } = process.env

export const getRoles = async () => {
    try {
        const { data } = await Axios.get<SuccessResponse<Role[]>>(
            `${REACT_APP_DEV_ENDPOINT_API}/users/roles`,
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

export const getAll = async () => {
    try {
        const { data } = await Axios.get<SuccessResponse<User[]>>(
            `${REACT_APP_DEV_ENDPOINT_API}/users`,
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

export const create = async (user: any) => {
    try {
        const { data } = await Axios.post<SuccessResponse<User>>(
            `${REACT_APP_DEV_ENDPOINT_API}/users`,
            user,
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

export const update = async (user: any) => {
    try {
        const { data } = await Axios.put<SuccessResponse<User>>(
            `${REACT_APP_DEV_ENDPOINT_API}/users/${user.id}`,
            user,
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

export const del = async (id: number) => {
    try {
        const { data } = await Axios.delete<SuccessResponse<number>>(
            `${REACT_APP_DEV_ENDPOINT_API}/users/${id}`,
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
