import { configureStore } from '@reduxjs/toolkit'

import { appStateReducer, userStateReducer } from './slices'
import { AppState, UserState } from './types/slices'

export interface Reducers {
    appState: AppState
    userState: UserState
}
export const store = configureStore({
    reducer: {
        appState: appStateReducer,
        userState: userStateReducer,
    },
})

export type AppDispatch = typeof store.dispatch
