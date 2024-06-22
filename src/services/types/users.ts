export interface User {
    id: number
    names: string
    lastNames: string
    email: string
    roleCode: number
    companyUuid: number
    avatar: string | null
}

export interface Role {
    id: number
    name: string
    code: string
}
