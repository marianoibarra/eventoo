import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const RecoverPass = createAsyncThunk('auth/recover', async (formData, { rejectWithValue }) => {

  try {
    const response = await axios.get(`https://api.eventoo.com.ar/user/reset-password/${formData}` )
    return response.data
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data)
    }
    throw error
  }
})
export const RecoverPassput = createAsyncThunk('auth/recoverPut', async (formData, { rejectWithValue }) => {
console.log(formData)
  try {
    const response = await axios.put(`https://api.eventoo.com.ar/user/reset-password/`,formData )
    console.log(response)
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
    throw error
  }
})

export const recover = createSlice({
  name: 'recover',
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {    setMessaggeError: (state, action) =>{

      state.error = action.payload
    },},
  extraReducers: {
    [RecoverPass.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [RecoverPass.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.user = action.payload.name
      state.loginIn = true
    },
    [RecoverPass.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.user = null
    },
    [RecoverPassput.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [RecoverPassput.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.user = action.payload.name
      state.send=true
    },
    [RecoverPassput.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.user = null
    },
  },
})
export const { setMessaggeError } =recover.actions

export default recover.reducer
