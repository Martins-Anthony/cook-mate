'use client'

import { useSelector } from 'react-redux'
import { authSelectors } from '@/store/selectors/authSelectors'
import NavLinks from '../NavLinks'
import AuthLink from '@/components/authentication/AuthLink'
import { Logo } from '@/components/Logo'

const SideBar: React.FC = () => {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)

  return (
    <aside className='hidden md:flex h-screen flex-col px-3 py-4 md:px-2'>
      <Logo size={'text-3xl'} />
      <div className='flex grow flex-col space-y-2'>
        <NavLinks />
        <div className='grow rounded-md bg-card shadow-md'></div>
        <AuthLink />
      </div>
    </aside>
  )
}

export default SideBar
