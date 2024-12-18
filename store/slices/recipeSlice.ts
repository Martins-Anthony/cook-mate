import { Recipe } from '@/models/Recipe'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: Recipe[] = []

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => action.payload,
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.push(action.payload)
    },
  },
})

export const { setRecipes, addRecipe } = recipeSlice.actions
export default recipeSlice.reducer