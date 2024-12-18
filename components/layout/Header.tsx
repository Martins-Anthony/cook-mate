import React from 'react'

interface HeaderProps {
  search: string
  setSearch: (value: string) => void
}

const Header: React.FC<HeaderProps> = ({ search, setSearch }) => {
  return (
    <header className='shadow-md p-4 flex justify-between items-center bg-primary'>
      <h1 className='text-white text-2xl font-bold'>Recettes</h1>
      <input
        type='text'
        placeholder='Rechercher...'
        className='border rounded-lg p-2 w-1/2'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </header>
  )
}

export default Header
