import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";

export const getBankAccounts = createAsyncThunk(
  'bankAccounts/getBankAccounts',
  async () =>
  {try {
    const res = await API('/bank-account');
    return res.data.bankAccounts
  } catch (error) {
    console.log(error)
  }}
)


export const createBankAccount = createAsyncThunk(
  'bankAccounts/createBankAccount',
  async (formData, { rejectWithValue }) => {
  try {
  const response = await API.post('/bank-account', formData);
  return response.data
} catch (error) {
  if (error.response) {
      console.log(error.response.data)
    return rejectWithValue(error.response.data)
  }
  throw error
}
})

export const bankAccountSlice = createSlice({
  name: 'bankAccounts',
  initialState: {
    bankAccount: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [getBankAccounts.pending]: (state) => {
      state.loading = true
    },
    [getBankAccounts.fulfilled]: (state, action) => {
      state.bankAccount = action.payload;
      state.loading = false;
      state.error = null;

    },
    [getBankAccounts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createBankAccount.pending]: (state) => {
      state.loading = true
    },
    [createBankAccount.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.bankAccount = [...state.bankAccount, action.payload.bankAccount]
    },
    [createBankAccount.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  }
}
)
export default bankAccountSlice.reducer;