'use client'

import SideBar from '@/components/layout/Sidebar'
import NavLinks from '@/components/layout/NavLinks'
import AuthLink from '@/components/authentication/AuthLink'
import withAuth from '@/hoc/withAuth'

function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      {/* SideBar */}
      <div className='w-full flex-none md:w-64'>
        <SideBar />
      </div>
      <main className='flex-grow overflow-y-auto'>{children}</main>
      <div className='flex flex-row p-3 justify-between space-x-2 md:hidden'>
        <NavLinks />
        <AuthLink />
      </div>
    </div>
  )
}

export default withAuth(DashboardLayout)
