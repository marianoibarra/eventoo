import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";


export const axiosModeEventsBuys = createAsyncThunk(
  'eventsBuysSlice/axiosModeEventsBuys',
  async () => {
    const res = await API.get('/transaction/buyer')
    return res.data
  }
)

const initialState = {
  events: [],
  loading: false,
  error: null
}

export const eventsBuysSlice = createSlice({
  name: 'eventsBuysSlice',
  initialState,
  reducers: {
    clearBuy: () => {
      return initialState;
    }
  },
  extraReducers: {
    [axiosModeEventsBuys.pending]: (state) => {
      state.loading = true
    },
    [axiosModeEventsBuys.fulfilled]: (state, action) => {
      state.events = action.payload.map(t => {return {...t.event, status: t.status, transactionId: t.id, tickets: t.tickets}}).filter(e => e !== null);
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
export const { clearBuy } = eventsBuysSlice.actions;
export default eventsBuysSlice.reducer