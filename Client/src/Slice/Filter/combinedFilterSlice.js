import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const combinedFilterUrl = 'https://api.eventoo.com.ar/home/events?'
const urlLocal = 'http://localhost:3001/home/events?'

//https://api.eventoo.com.ar/home/events?&modality=Virtual&category=Talks&inWeekend=true&

export const axiosCombinedFilter = createAsyncThunk(
  'filter/axiosCombinedFilter',
  async (resultSuperQuery) => {
    const res = await axios.get(combinedFilterUrl + resultSuperQuery)
    return res.data
  })

export const combinedFilterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: []
  },
  reducers: { },
  extraReducers: {
    [axiosCombinedFilter.pending]: (state) => {
      state.loading = true
    },
    [axiosCombinedFilter.fulfilled]: (state, action) => {
      state.filter = action.payload
      state.loading = false
      state.error = null
    },
    [axiosCombinedFilter.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    }
  }
}
)

export const {
  setCombinedFilter
} = combinedFilterSlice.actions


export default combinedFilterSlice.reducer