import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";


export const axiosPostTicket = createAsyncThunk(
  'transaction/axiosPostTicket',
  async (object, { rejectWithValue }) => {
    try {
      const res = await API.post('/transaction', object)
      localStorage.setItem('idTransaction', JSON.stringify(res.data))
      return res.data
    } catch (error) {
      if (error.res) {
        return rejectWithValue(error.res.data)
      }
      throw error
    }
  })


export const axiosPutTicket = createAsyncThunk(
  'transaction/axiosPutTicket',
  async ({ id, pdfIsFetching }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/transaction/complete/${id}`, pdfIsFetching)
      return res.data
    } catch (error) {
      if (error.res) {
        return rejectWithValue(error.res.data)
      }
      throw error;
    }
  }
)


export const axiosCANCELTicket = createAsyncThunk(
  'transaction/axiosCANCELTicket',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.put(`/transaction/cancel/${id}`)
      return res.data
    } catch (error) {
      if (error.res) {
        return rejectWithValue(error.res.data)
      }
    }
  }
)

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
    },


    [axiosPutTicket.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [axiosPutTicket.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.transaction = action.payload
    },
    [axiosPutTicket.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },

    [axiosCANCELTicket.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [axiosCANCELTicket.fulfilled]: (state) => {
      state.loading = false
      state.error = null
    },
    [axiosCANCELTicket.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
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