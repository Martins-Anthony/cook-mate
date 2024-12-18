'use client'

import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'
import { useAuth } from '@/lib/useAuth'

function withAuth<P extends {}>(WrappedComponent: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login')
      }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
      return null // Écran vide ou de chargement
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
