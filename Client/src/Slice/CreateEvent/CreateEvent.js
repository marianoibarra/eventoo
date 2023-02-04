import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const eventUrl = 'http://api.eventoo.online/event'

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async () => {
    const res = await axios.post(eventUrl)
    return res.data
})


export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    name: '',
    description: '',
    cover_pic: '',
    address_line: '',
    city: '',
    state: '',
    country: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    isPublic: true,
    virtualURL: '',
    guests_capacity: '',
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
    resetForm: (state) => {
      state.name = '';
      state.description = '';
      state.cover_pic = '';
      state.address_line = '';
      state.city = '';
      state.state = '';
      state.country = '';
      state.start_date = '';
      state.end_date = '';
      state.start_time = '';
      state.end_time = '';
      state.isPublic = false;
      state.virtualURL = '';
      state.guests_capacity = 100;
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
  } = eventSlice.actions;
  
  export const selectEvent = (state) => state.event;
  
  export default eventSlice.reducer;
