import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import { API } from "../../App";

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/event", formData);
      return response.data;
    } catch (error) {
      console.log(error)
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

const initialState = {
  event: {},
  loading: false,
  error: null,
  preference_id: null,
}

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clear: () => {
      return initialState
    }
  },
  extraReducers: {
    [createEvent.pending]: (state) => {
      state.loading = true;
      state.preference_id = null;
    },
    [createEvent.fulfilled]: (state, action) => {
      state.event = action.payload.event;
      state.preference_id = action.payload.preference_id;
      state.loading = false;
      state.error = null;
      // const eventId = action.payload.id;
      // const redirectUrl = `event/${eventId}`;
      // window.location.href = redirectUrl;
    },
    [createEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});


export const { clear } = eventSlice.actions;

export const selectEvent = (state) => state.event;

export default eventSlice.reducer;
