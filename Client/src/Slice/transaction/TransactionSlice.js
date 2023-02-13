import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";


export const axiosPostTicket = createAsyncThunk(
  'transaction/axiosPostTicket',
  async (object, { rejectWithValue }) => {
    console.log(object, 'desde el slice')
    try {
      const res = await API.post('/transaction', object)
      console.log(res.data)
      localStorage.setItem('idTransaction', JSON.stringify(res.data))
      return res.data
    } catch (error) {
      if (error.res) {
        console.log(error.res.data)
        return rejectWithValue(error.res.data)
      }
      throw error
    }
  })



export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transaction: null,
    loading: false,
    error: null
  }, 
  reducers: {},
  extraReducers: {
    [axiosPostTicket.pending]: (state) => {
      state.loading = true;
      state.error = null
    },
    [axiosPostTicket.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.transaction = action.payload
    },
    [axiosPostTicket.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error
    }
  }
})

export default transactionSlice.reducer

// export const createBankAccount = createAsyncThunk(
//   'bankAccounts/createBankAccount',
//   async (formData, { rejectWithValue }) => {
//   try {
//   const response = await axios.post('https://api.eventoo.com.ar/bank-account', formData);
//   return response.data
// } catch (error) {
//   if (error.response) {
//       console.log(error.response.data)
//     return rejectWithValue(error.response.data)
//   }
//   throw error
// }
// })