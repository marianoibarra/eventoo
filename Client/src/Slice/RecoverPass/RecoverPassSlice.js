import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const RecoverPass = createAsyncThunk('auth/forgot', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://api.eventoo.online//user/reset-password/${formData}` )
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
  reducers: {},
  extraReducers: {
    [RecoverPass.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [RecoverPass.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.user = action.payload.name
      state.changePass=action.payload.changePassToken
    },
    [RecoverPass.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.user = null
    },
  },
})


export default recover.reducer
