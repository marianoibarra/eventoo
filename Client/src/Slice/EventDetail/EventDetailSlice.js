import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";

export const axiosModeEventDetail = createAsyncThunk(
  "eventDetail/axiosModeEventDetail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/home/events/${id}`);
      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const axiosModeEditEventDetail = createAsyncThunk(
  "eventDetail/axiosModeEditEventDetail",
  async ({id, body}, { rejectWithValue }) => {
    try {
      const res = await API.put(`/event/${id}`, body);
      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const eventDetailSlice = createSlice({
  name: "eventDetail",
  initialState: {
    eventDetail: {},
    isPublic: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [axiosModeEventDetail.pending]: (state) => {
      state.eventDetail = {};
      state.isPublic = null;
      state.loading = true;
      state.error = null;
    },
    [axiosModeEventDetail.fulfilled]: (state, action) => {
      state.eventDetail = action.payload.event;
      state.isPublic = action.payload.isPublic;
      state.loading = false;
      state.error = null;
    },
    [axiosModeEventDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [axiosModeEditEventDetail.pending]: (state) => {
      state.loading = true;
    },
    [axiosModeEditEventDetail.fulfilled]: (state, action) => {
      state.eventDetail = action.payload.event;
      state.isPublic = action.payload.isPublic;
      state.loading = false;
      state.error = null;
    },
    [axiosModeEditEventDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default eventDetailSlice.reducer;