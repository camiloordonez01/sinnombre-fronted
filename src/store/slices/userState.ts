import { createSlice } from '@reduxjs/toolkit'
import { UserState } from '../types/slices'
import { getUser } from '../../utils/auth'

const user = getUser()

const initialState: UserState = {
    names: user ? user.names : '',
    email: user ? user.email : '',
    avatar: user ? user.avatar : './avatar.png',
    companyUuid: user ? user.companyUuid : null,
}

export const userStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.names = action.payload.names
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state.companyUuid = action.payload.companyUuid
        },
    },
})

const { reducer, actions } = userStateSlice

export const { setUser } = actions
export default reducer
