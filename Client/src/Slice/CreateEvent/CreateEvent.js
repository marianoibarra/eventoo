import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const eventUrl = 'http://api.eventoo.online/event'

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(eventUrl, formData);
      console.log(response)
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    name: null,
    description: null,
    cover_pic: null,
    address_line: null,
    city: null,
    state: null,
    country: null,
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    isPublic: true,
    virtualURL: null,
    guests_capacity: null,
    category: null,
  },
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updateCoverPic: (state, action) => {
      state.cover_pic = action.payload;
    },
    updateAddressLine: (state, action) => {
      state.address_line = action.payload;
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateState: (state, action) => {
      state.state = action.payload;
    },
    updateCountry: (state, action) => {
      state.country = action.payload;
    },
    updateStartDate: (state, action) => {
      state.start_date = action.payload;
    },
    updateEndDate: (state, action) => {
      state.end_date = action.payload;
    },
    updateStartTime: (state, action) => {
      state.start_time = action.payload;
    },
    updateEndTime: (state, action) => {
      state.end_time = action.payload;
    },
    updateIsPublic: (state, action) => {
      state.isPublic = action.payload;
    },
    updateVirtualURL: (state, action) => {
      state.virtualURL = action.payload;
    },
    updateGuestsCapacity: (state, action) => {
      state.guests_capacity = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateCategory: (state, action) => {
      state.category = action.payload;
    },
    resetForm: (state) => {
      state.name = null;
      state.description = null;
      state.cover_pic = null;
      state.address_line = null;
      state.city = null;
      state.state = null;
      state.country = null;
      state.start_date = null;
      state.end_date = null;
      state.start_time = null;
      state.end_time = null;
      state.isPublic = false;
      state.virtualURL = null;
      state.guests_capacity = null;
      state.category=null;
    },
  },
  extraReducers: {
    [createEvent.pending]: (state) => {
      state.loading = true;
    },
    [createEvent.fulfilled]: (state, action) => {
      state.categories = action.payload     
      state.loading=false;
      state.error=null;
    },
    [createEvent.rejected]: (state, action)=>{
      state.loading=false;
      state.error= action.error;
    }
  }
});

export const {
  updateName,
  updateDescription,
  updateCoverPic,
  updateAddressLine,
  updateCity,
  updatestate,
  updateCountry,
  updateStartDate,
  updateEndDate,
  updateStartTime,
  updateEndTime,
  updateIsPublic,
  updateVirtualURL,
  updateGuestsCapacity,
  resetForm,
  updateCategory,
  } = eventSlice.actions;
  
  export const selectEvent = (state) => state.event;
  
  export default eventSlice.reducer;
