import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";

export const axiosModeEventDetail = createAsyncThunk(
  "eventDetail/axiosModeEventDetail",
  async (id, { rejectWithValue }) => {
    try {
      if (id) {
        const res = await API.get(`/home/events/${id}`);
        console.log(res.data, 'axiosModeEventDetail')
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
  async ({ id, body }, { rejectWithValue }) => {
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


export const axiosGetEventPrivate = createAsyncThunk(
  'eventDetail/axiosGentEventPrivate',
  async (objPrivate, { rejectWithValue }) => {
    try {
      console.log(objPrivate)
      const res = await API.get(`/event/checkPrivate`, objPrivate)
      console.log(res.data, 'la respuesta')
      return res.data
    } catch (error) {
      if (error.res) {
        return rejectWithValue(error.res.data)
      }
    }
  }
)


const initialState = {
  eventDetail: {},
  showEvent: true,
  loading: false,
  error: null,
  errorPass: null
}


export const eventDetailSlice = createSlice({
  name: "eventDetail",
  initialState,
  reducers: {
    clear: () => {
      return initialState;
    }
  },
  extraReducers: {
    [axiosModeEventDetail.pending]: (state) => {
      state.loading = true;
    },
    [axiosModeEventDetail.fulfilled]: (state, action) => {
      state.eventDetail = action.payload.event;
      state.showEvent = action.payload.isPublic;
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
      state.showEvent = action.payload.isPublic;
      state.loading = false;
      state.error = null;
    },
    [axiosModeEditEventDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [axiosGetEventPrivate.pending]: (state) => {
      state.loading = true;
      state.errorPass = null
    },
    [axiosGetEventPrivate.fulfilled]: (state, action) => {
      console.log(action.payload,'entre al fulfilled')
      state.eventDetail = action.payload;
      state.showEvent = action.payload;
      state.loading = false;
      state.errorPass = null;
    },
    [axiosGetEventPrivate.rejected]: (state, action) => {
      state.loading = false;
      state.errorPass = action.error;
    },
  },


});


export const { clear } = eventDetailSlice.actions;
export default eventDetailSlice.reducer;