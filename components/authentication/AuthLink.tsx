'use client'

import Link from 'next/link'
import { PowerIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { authSelectors } from '@/store/selectors/authSelectors'
import { RootState } from '@/store/store'
import { logOut } from '@/lib/auth'

const AuthLink = () => {
  // const user = useSelector((state: RootState) => state.auth.user) // Récupérer l'état utilisateur
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)

  return isAuthenticated ? (
    <button
      onClick={logOut}
      className='shadow-md flex h-[48px] items-center justify-center gap-2 rounded-md bg-card p-3 text-sm font-medium hover:bg-red-50 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3'
    >
      <PowerIcon className='w-6' />
      <div className='hidden md:block'>Se déconnecter</div>
    </button>
  ) : (
    <Link
      href='/login'
      className='flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3'
    >
      <PowerIcon className='w-6' />
      <div className='hidden md:block'>Se connecter</div>
    </Link>
  )
}

export default AuthLink
// flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-green-50 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3
