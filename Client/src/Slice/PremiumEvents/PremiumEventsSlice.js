import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";

export const getPremiumEvents = createAsyncThunk(
  'premiumEvents/getPremiumEvents',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API('/home/premium')
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
})

const initialState = {
  premiumEvents: [],
  loading: false,
  error: null
}

export const premiumEvents = createSlice({
  name: 'premiumEvents',
  initialState,
  reducers: {
    clearPremium: (state, action) => {
      return initialState
    }
  },
  extraReducers: {
    [getPremiumEvents.pending]: (state) => {
      state.loading = true
    },
    [getPremiumEvents.fulfilled]: (state, action) => {
      state.premiumEvents = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getPremiumEvents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
}
)

export const {
  clearPremium
} = premiumEvents.actions

export default premiumEvents.reducer