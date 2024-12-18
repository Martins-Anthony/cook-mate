import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/authSlice'
import recipeReducer from './slices/recipeSlice'

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null)
  },
  setItem(_key: string, _value: any) {
    return Promise.resolve()
  },
  removeItem(_key: string) {
    return Promise.resolve()
  },
})

const storageFallback =
  typeof window !== 'undefined' ? storage : createNoopStorage()

const rootReducer = combineReducers({
  auth: authReducer,
  recipes: recipeReducer,
})

const persistConfig = {
  key: 'root',
  storage: storageFallback,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE',
        ],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
