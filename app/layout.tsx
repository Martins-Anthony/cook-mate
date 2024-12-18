import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientProvider from '../components/ClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cook Mate',
  description: 'Un compagnon pour gérer et créer des recettes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='fr'>
      <body className={inter.className}>
        {/* Client-side logic for Redux and Firebase */}
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
