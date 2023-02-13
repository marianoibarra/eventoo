import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const eventUrl = 'https://api.eventoo.com.ar/event'


export const axiosModeEventsCreateForUser = createAsyncThunk(
  'events/axiosModeEventsCreateForUser',
  async () => {
    const res = await axios.get(eventUrl)
    return res.data
  }
)

export const eventsCreateForUserSlice = createSlice({
  name: 'CreateForUser',
  initialState: {
    events: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [axiosModeEventsCreateForUser.pending]: (state) => {
      state.loading = true
    },
    [axiosModeEventsCreateForUser.fulfilled]: (state, action) => {
      state.events = action.payload;
      state.loading = false;
      state.error = null;

    },
    [axiosModeEventsCreateForUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
}
)
export default eventsCreateForUserSlice.reducer