import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const categoriesUrl = 'https://eventoo-api.onrender.com/home/categories'

export const axiosModeCategories = createAsyncThunk(
  'categories/axiosModeCategories',
  async () => {
    const res = await axios.get(categoriesUrl)
    return res.data
  })


export const categorieSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [axiosModeCategories.pending]: (state) => {
      state.loading = true;
    },
    [axiosModeCategories.fulfilled]: (state, action) => {
      state.categories = action.payload     
      state.loading=false;
      state.error=null;
    },
    [axiosModeCategories.rejected]: (state, action)=>{
      state.loading=false;
      state.error= action.error;
    }
  }
})

export default categorieSlice.reducer
