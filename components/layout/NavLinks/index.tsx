'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { links } from './links'

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <nav className=' md:py-2 md:space-y-4 md:flex-col md:space-x-0 space-x-2 flex flex-row justify-between w-full rounded-md'>
      {links.map(link => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-card text-sm font-medium hover:bg-secondary hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 shadow-md',
              {
                'bg-sky-100 text-primary': pathname === link.href,
              }
            )}
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        )
      })}
    </nav>
  )
}
