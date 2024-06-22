import Axios, { AxiosError } from 'axios'
import { ErrorResponse, SuccessResponse } from './types'

const { REACT_APP_DEV_ENDPOINT_API } = process.env

export const login = async (email: string, password: string) => {
    try {
        const { data } = await Axios.post<SuccessResponse<string>>(
            `${REACT_APP_DEV_ENDPOINT_API}/users/login`,
            {
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
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
