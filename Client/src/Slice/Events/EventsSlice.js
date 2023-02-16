import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";
import QueryBuilder from 'url-search-query-builder'; 

const q = new QueryBuilder('/');

export const getEvents = createAsyncThunk(
  'events/getEvents',
  async (filter, { rejectWithValue }) => {
    try {
      let query = q.buildUrlWithObj('/', Object.fromEntries(Object.entries(filter).filter(value => value[1])))
      const response = await API.get(`/home/events${query}` )
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
})

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [getEvents.pending]: (state) => {
      state.loading = true
    },
    [getEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getEvents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
}
)
export default eventsSlice.reducer