import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const urlLocal = `http://localhost:3001/home/events/${id}`
export const axiosModeEventDetail = createAsyncThunk(
  "eventDetail/axiosModeEventDetail",
  async (id, { rejectWithValue }) => {
    try {
      if(id){
        const res = await axios.get(`https://api.eventoo.com.ar/home/events/${id}`);
        return res.data;
      }
      else return {};
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
      const res = await axios.put(`https://api.eventoo.com.ar/event/${id}`, body);
      console.log('data', res.data);
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
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [axiosModeEventDetail.pending]: (state) => {
      state.loading = true;
    },
    [axiosModeEventDetail.fulfilled]: (state, action) => {
      state.eventDetail = action.payload;
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
      state.eventDetail = action.payload;
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