import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";


export const axiosModeEventsBuys = createAsyncThunk(
  'events/axiosModeEventsBuys',
  async () => {
    const res = await API.get('/transaction/seller')
    return res.data
  }
)

export const eventsBuysSlice = createSlice({
  name: 'events',
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