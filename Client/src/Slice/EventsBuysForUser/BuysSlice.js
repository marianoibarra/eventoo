import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const eventUrl = 'https://api.eventoo.com.ar/transaction/user'


export const axiosModeEventsBuys = createAsyncThunk(
  'events/axiosModeEventsBuys',
  async () => {
    const res = await axios.get(eventUrl)
    return res.data
  }
)

export const eventsBuysSlice = createSlice({
  name: 'Buys',
  initialState: {
    events: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [axiosModeEventsBuys.pending]: (state) => {
      state.loading = true
    },
    [axiosModeEventsBuys.fulfilled]: (state, action) => {
      state.events = action.payload;
      state.loading = false;
      state.error = null;

    },
    [axiosModeEventsBuys.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
}
)
export default eventsBuysSlice.reducer