import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";

export const getFavorites = createAsyncThunk(
  'favorites/getFavorites',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API('/favorites')
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
})

export const switchFavorites = createAsyncThunk(
  'favorites/switchFavorites',
  async (id, { getState, rejectWithValue }) => { 
    try {
      const {favorites:{favorites}} = getState()
      console.log(favorites)
      if(favorites.some(f => f === id)) {
        await API.delete('/favorites', {id})
        return {add: false, id}
      } else {
        await API.post('/favorites', {id})
        return {add: true, id}
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
})

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [getFavorites.pending]: (state) => {
      state.loading = true
    },
    [getFavorites.fulfilled]: (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getFavorites.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [switchFavorites.pending]: (state) => {
      state.loading = true
    },
    [switchFavorites.fulfilled]: (state, action) => {
      return {
        favorites: action.payload.add ? [...state.favorites, action.payload.id ] : [...state.favorites.filter(f => f !== action.payload.id)],
        loading: false,
        error: null,
      }
    },
    [switchFavorites.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
}
)
export default favoritesSlice.reducer