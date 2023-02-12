import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useContext } from 'react'
import { SessionContext } from '../..'

export const createUser = createAsyncThunk('auth/register', async (args, { rejectWithValue }) => {
  try {
    console.log(args)
    const {input, setShowSessionModal} = args
    const response = await axios.post('https://api.eventoo.com.ar/user/register', input)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('data', JSON.stringify(response.data.data))
    setShowSessionModal(null)
    return response.data
  } catch (error) {
    console.log(error)
    if (error.response) {
      return rejectWithValue(error.response.data)
    }
    throw error
  }
})

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.user = action.payload
      state.loginIn=true
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.user = null
    },
  },
})


export default registerSlice.reducer
