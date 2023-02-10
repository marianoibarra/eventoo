import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLocation = createAsyncThunk('location/fetchLocation', async (coordinates, thunkAPI) => {
  const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${coordinates.latitude}+${coordinates.longitude}&key=6662b31baf0b4deeb5ec30d08b258021`);
  return response.data.results[0].components;
});

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    city: '',
    province: '',
    country: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchLocation.pending]: (state) => {
      state.loading = true;
    },
    [fetchLocation.fulfilled]: (state, action) => {
      state.city = action.payload.city;
      state.province = action.payload.state;
      state.country = action.payload.country;
      state.loading = false;
      state.error = null;
    },
    [fetchLocation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default locationSlice.reducer;
