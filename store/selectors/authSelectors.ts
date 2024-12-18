import { RootState } from '../store' // Importez le type de l'état global si défini

export const authSelectors = {
  isAuthenticated: (state: RootState) => Boolean(state.auth.user?.uid), // Vérifie si user.uid existe
  user: (state: RootState) => state.auth.user,
}
