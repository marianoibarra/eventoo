import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";


export const axiosModeEventsBuys = createAsyncThunk(
  'eventsBuysSlice/axiosModeEventsBuys',
  async () => {
    const res = await API.get('/transaction/buyer')
    return res.data
  }
)

export const eventsBuysSlice = createSlice({
  name: 'eventsBuysSlice',
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
      state.events = action.payload.map(t => {return {...t.event, status: t.status}}).filter(e => e !== null);
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