import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../types/slices'

const initialState: AppState = {
    sidebarShowing: false,
    notifications: [],
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setSidebarShowing: (state, action) => {
            state.sidebarShowing = action.payload
        },
        pushNotification: (state, action) => {
            state.notifications.push(action.payload)
        },
        deleteNotification: (state) => {
            state.notifications.shift()
        },
    },
})

const { reducer, actions } = appStateSlice

export const { setSidebarShowing, pushNotification, deleteNotification } = actions
export default reducer
