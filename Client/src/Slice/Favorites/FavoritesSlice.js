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
      if(favorites.some(f => f === id)) {
        const response = await API.delete('/favorites', {
          data: {
            id: id
          }
        })
        return response.data
      } else {
        const response = await API.post('/favorites', {id: id})
        return response.data
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
})

const initialState = {
  favorites: [],
  loading: false,
  error: null
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state, action) => {
      return initialState
    }
  },
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
      state.error = action.payload;
    },
    [switchFavorites.pending]: (state) => {
      state.loading = true
    },
    [switchFavorites.fulfilled]: (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
      state.error = null;
    },
    [switchFavorites.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
}
)
export default favoritesSlice.reducer