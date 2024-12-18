import { useSelector } from 'react-redux'
import { authSelectors } from '@/store/selectors/authSelectors'

export const useAuth = () => {
  const user = useSelector(authSelectors.user)
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)
  return { user, isAuthenticated }
}
