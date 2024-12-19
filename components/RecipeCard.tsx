import React, { FC } from 'react'
import defaultImage from 'assets/defaultRecipe.webp'

interface RecipeCardProps {
  title: string
  image?: string
  description?: string
  category?: string
}

const RecipeCard: FC<RecipeCardProps> = ({
  title,
  image,
  description,
  category,
}) => {
  return (
    <div className='shadow rounded-lg p-4 hover:shadow-lg cursor-pointer'>
      <img
        src={image || defaultImage.src} // Utilise l'image par défaut si 'image' est manquant
        alt={title}
        className='w-full h-40 object-cover rounded-lg'
      />
      <h3 className='pt-2 text-md font-semibold'>{title}</h3>
      {category && (
        <p className='text-sm text-gray-500'>Catégorie : {category}</p>
      )}
      {description && <p className='mt-2 text-gray-700'>{description}</p>}
    </div>
  )
}

export default RecipeCard
