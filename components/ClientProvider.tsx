'use client'

import { ReactNode, useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store, persistor } from '../store/store'
import { monitorAuthState } from '../lib/auth'
import { PersistGate } from 'redux-persist/integration/react'

const AuthInitializer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    monitorAuthState(dispatch)
  }, [dispatch])

  return null
}

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
