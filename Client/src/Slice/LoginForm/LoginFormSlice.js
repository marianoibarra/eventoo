import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const login = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://api.eventoo.online/user/login', formData)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('data', JSON.stringify(response.data.data))
    return response.data
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data)
    }
    throw error
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.user = action.payload
      state.loginIn=true
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.user = null
    },
  },
})


export default authSlice.reducer
