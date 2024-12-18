'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/useAuth'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Redirection basée sur l'état utilisateur
  useEffect(() => {
    if (isAuthenticated === undefined) return

    if (isAuthenticated) {
      router.push('/dashboard') // Redirige vers le tableau de bord si connecté
    } else {
      router.push('/login') // Redirige vers la page de connexion si non connecté
    }
    setLoading(false)
  }, [isAuthenticated, router])

  if (loading) {
    return <div>Chargement...</div> // Affiche un écran de chargement
  }

  return null
}
