import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";


export const axiosModeEventsCreateForUser = createAsyncThunk(
  'CreateForUser/axiosModeEventsCreateForUser',
  async () => {
    const res = await API.get('/event')
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