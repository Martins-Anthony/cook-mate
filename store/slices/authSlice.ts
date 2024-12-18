import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: null | {
    uid: string
    email: string | null
    displayName: string | null
  }
}

const initialState: UserState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload
    },
    clearUser: state => {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
