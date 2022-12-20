import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const admin = JSON.parse(localStorage.getItem('admin'))
const initialState = {
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (admin, thunkAPI) => {
  try {
    return await authService.login(admin)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload,'fullfilled')
        state.isLoading = false
        state.isSuccess = true
        state.user = null
        state.admin = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        console.log('rehchredtecrwwew');
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.admin = null
        state.user = null
      })
      .addCase(login.pending, (state) => {
        console.log('pendinfggggg');
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('login success');
        state.isLoading = false
        state.isSuccess = true
        state.user = null
        state.admin = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        console.log('login rejected');
        
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        state.admin = null
      })
      .addCase(logout.fulfilled, (state) => {
        console.log('logout success');

        state.admin = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
