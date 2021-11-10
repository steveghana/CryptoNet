import {configureStore} from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cryptoapi'
import {cryptoNewsApi } from '../services/cryptoNewsapi'
export const store = configureStore({
    reducer: {
        [cryptoApi.reducerPath] : cryptoApi.reducer,
        [cryptoNewsApi.reducerPath] : cryptoNewsApi.reducer,
    },
})