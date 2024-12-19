'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import RecipeCard from '@/components/RecipeCard'
import { Section } from '@/components/layout/Section'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function Dashboard() {
  const [search, setSearch] = useState('')
  const [recipes, setRecipes] = useState<any[]>([]) // Liste des recettes récupérées
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]) // Liste des recettes filtrées par recherche
  const [categoryFilter, setCategoryFilter] = useState('') // Filtre par catégorie

  // Fonction pour récupérer les recettes depuis Firestore
  const fetchRecipes = async () => {
    try {
      const recipesCollection = collection(db, 'recipes')
      const querySnapshot = await getDocs(recipesCollection)

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id, // Ajoute l'ID du document Firestore
        ...doc.data(),
      }))

      setRecipes(data)
      setFilteredRecipes(data)
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error)
    }
  }

  // Effet pour charger les recettes au montage du composant
  useEffect(() => {
    fetchRecipes()
  }, [])

  // Effet pour filtrer les recettes selon la recherche et la catégorie
  useEffect(() => {
    let filtered = recipes

    if (search.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter(recipe => recipe.category === categoryFilter)
    }

    setFilteredRecipes(filtered)
  }, [search, categoryFilter, recipes])

  return (
    <div className='min-h-screen p-4'>
      <Header search={search} setSearch={setSearch} />
      {/* Categories */}
      <Section className='mt-6'>
        <h2 className='text-lg font-semibold mb-2'>Catégories</h2>
        <div className='grid grid-cols-4 gap-4'>
          {['Entrées', 'Plats', 'Desserts', 'Tout'].map(category => (
            <button
              key={category}
              onClick={
                category === 'Tout'
                  ? () => setCategoryFilter('')
                  : () => setCategoryFilter(category)
              }
              className={`py-2 px-4 rounded-lg text-white shadow-md ${
                (category === 'Tout' && categoryFilter === '') ||
                categoryFilter === category
                  ? 'bg-primary' // État actif
                  : 'bg-secondary hover:bg-primary' // État inactif
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Section>

      {/* Recipes List */}
      <Section className='mt-6'>
        <h2 className='text-lg font-semibold mb-2'>Recettes disponibles</h2>
        {filteredRecipes.length > 0 ? (
          <div className='grid grid-cols-2 gap-4'>
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                description={recipe.description}
                category={recipe.category}
              />
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>Aucune recette trouvée.</p>
        )}
      </Section>
    </div>
  )
}
