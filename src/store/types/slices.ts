export interface Notification {
    type: 'danger' | 'success' | 'info'
    message: string
}

export interface AppState {
    sidebarShowing: boolean
    notifications: Notification[]
}

export interface UserState {
    names: string
    email: string
    avatar: string
    companyUuid: number | null
}
