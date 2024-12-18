'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import RecipeCard from '@/components/RecipeCard'
import { Section } from '@/components/layout/Section'

export default function Dashboard() {
  const [search, setSearch] = useState('')

  return (
    <div className='min-h-screen p-4'>
      <Header search={search} setSearch={setSearch} />
      {/* Categories */}
      <Section className='mt-6'>
        <h2 className='text-lg font-semibold mb-2'>Catégories</h2>
        <div className='grid grid-cols-3 gap-4'>
          {['Entrées', 'Plats', 'Desserts'].map(category => (
            <button
              key={category}
              className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
            >
              {category}
            </button>
          ))}
        </div>
      </Section>

      {/* Recipes List */}
      <Section className='mt-6'>
        <h2 className='text-lg font-semibold mb-2'>Recettes disponibles</h2>
        <div className='grid grid-cols-2 gap-4'>
          {[1, 2, 3, 4].map(id => (
            <RecipeCard key={id} title={`Nom de la recette ${id}`} />
          ))}
        </div>
      </Section>
    </div>
  )
}
