import { jwtDecode } from 'jwt-decode'

export const getUser = () => {
    const token = localStorage.getItem('token')
    if (!token) return false

    interface DataToken {
        names: string
        email: string
        avatar: string
        companyUuid: number | null
    }
    const decoded = jwtDecode<DataToken>(token)
    return decoded
}
