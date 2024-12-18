'use client'

import { Section } from '@/components/layout/Section'
import { Spacing } from '@/components/layout/Spacing'
import { db } from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function AddRecipe() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([])
  const [newIngredient, setNewIngredient] = useState('')
  const [steps, setSteps] = useState<string[]>([])
  const [newStep, setNewStep] = useState('')
  const [difficulty, setDifficulty] = useState('Facile')
  const [duration, setDuration] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [category, setCategory] = useState('Entrées')

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient])
      setNewIngredient('')
    }
  }

  const removeIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index)
    setIngredients(updatedIngredients)
  }

  const addStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, newStep])
      setNewStep('')
    }
  }

  const removeStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index)
    setSteps(updatedSteps)
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0])
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      // Crée l'objet de la recette
      const recipeData = {
        title,
        description,
        ingredients,
        steps,
        duration,
        category,
        difficulty,
        createdAt: new Date(),
      }

      // Ajoute l'objet dans la collection 'recipes' dans Firestore
      await addDoc(collection(db, 'recipes'), recipeData)

      alert('Recette ajoutée avec succès !')
      // Réinitialiser les champs du formulaire
      resetForm()
    } catch (error) {
      console.error("Erreur lors de l'ajout : ", error)
      alert("Erreur lors de l'ajout de la recette.")
    }
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setIngredients([])
    setSteps([])
    setDuration('')
    setCategory('Entrées')
    setDifficulty('Facile')
  }

  return (
    <div className='min-h-screen p-4'>
      <Spacing size='sm'/>
      <Section className='p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-6'>
          Ajouter une nouvelle recette
        </h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Titre */}
          <input
            type='text'
            placeholder='Titre de la recette'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />

          {/* Description */}
          <textarea
            placeholder='Description de la recette'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='w-full p-2 border rounded'
            rows={3}
          />

          {/* Ingrédients */}
          <div>
            <label className='block font-medium'>Ingrédients</label>
            <div className='flex items-center'>
              <input
                type='text'
                placeholder='Ajouter un ingrédient'
                value={newIngredient}
                onChange={e => setNewIngredient(e.target.value)}
                className='p-2 border rounded flex-1'
              />
              <button
                type='button'
                onClick={addIngredient}
                className='ml-2 bg-blue-500 text-white px-4 py-2 rounded'
              >
                Ajouter
              </button>
            </div>
            <ul className='mt-2'>
              {ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className='p-1 border-b flex justify-between items-center'
                >
                  {ingredient}{' '}
                  <button
                    onClick={() => removeIngredient(index)}
                    title='Supprimer'
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Étapes */}
          <div>
            <label className='block font-medium'>Étapes de préparation</label>
            <div className='flex items-center'>
              <input
                type='text'
                placeholder='Ajouter une étape'
                value={newStep}
                onChange={e => setNewStep(e.target.value)}
                className='p-2 border rounded flex-1'
              />
              <button
                type='button'
                onClick={addStep}
                className='ml-2 bg-blue-500 text-white px-4 py-2 rounded'
              >
                Ajouter
              </button>
            </div>
            <ol className='mt-2 list-decimal pl-5'>
              {steps.map((step, index) => (
                <li
                  key={index}
                  className='p-1 border-b flex justify-between items-center'
                >
                  {step}
                  <button onClick={() => removeStep(index)} title='Supprimer'>
                    ❌
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Durée */}
          <input
            type='text'
            placeholder='Durée de préparation (ex: 30 min)'
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className='w-full p-2 border rounded'
          />
          <div className='flex items-center gap-2'>
            {/* Catégorie */}
            <div className='w-full'>
              <label className='font-medium'>Catégorie</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className='w-full p-2 border rounded'
              >
                <option value='Entrées'>Entrées</option>
                <option value='Plats'>Plats</option>
                <option value='Desserts'>Desserts</option>
              </select>
            </div>

            {/* Difficulté */}
            <div className='w-full'>
              <label className='font-medium'>Difficulté</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className='w-full p-2 border rounded'
              >
                <option value='Facile'>Facile</option>
                <option value='Moyen'>Moyen</option>
                <option value='Difficile'>Difficile</option>
              </select>
            </div>
          </div>
          {/* Image */}
          <div>
            <label className='block font-medium'>Image</label>
            <input type='file' accept='image/*' onChange={handleImageUpload} />
          </div>

          {/* Bouton d'envoi */}
          <button
            type='submit'
            className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600'
          >
            Ajouter la recette
          </button>
        </form>
      </Section>
    </div>
  )
}
