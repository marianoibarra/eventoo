import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLocationFromIP = createAsyncThunk(
    'location/getLocationFromIP',
    async () => {
      try {
        const response = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=65202379ce1b4f20970d3cc71bbb8ee7');
        const { city, country_name, latitude, longitude } = response.data;
        return { city, country: country_name, latitude, longitude };
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );
  
  export const locationIpSlice = createSlice({
    name: 'location',
    initialState: {
      city: '',
      country: '',
      latitude: null,
      longitude: null,
      loading: false,
      error: null,
    },
    reducers: {
      setLocation: (state, action) => {
        state.city = action.payload.city;
        state.country = action.payload.country;
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
      },
    },
    extraReducers: {
      [getLocationFromIP.pending]: (state) => {
        state.loading = true;
      },
      [getLocationFromIP.fulfilled]: (state, action) => {
        state.city = action.payload.city;
        state.country = action.payload.country;
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.loading = false;
      },
      [getLocationFromIP.rejected]: (state, action) => {
        state.error = action.error;
        state.loading = false;
      },
    },
  });

  export const { setLocation } = locationIpSlice.actions;

  export default locationIpSlice.reducer;