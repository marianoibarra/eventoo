import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  description: null,
  start_date: null,
  end_date: null,
  start_time: null,
  end_time: null,
  isPremium: null,
  isPaid: null,
  age_range: null,
  guests_capacity: null,
  placeName: null,
  advertisingTime_start: null,
  adversiting_end: null,
  cover_pic: null,
  disability_access: null,
  parking: null,
  smoking_zone: null,
  pet_friendly: null,
  isToday: null,
  isNextWeekend: null,
  organizer: null,
  category: null,
  modality: null,
  address_line: null,
  city: null,
  state: null,
  country: null,
  zip_code: null,
}

export const newFilterSlice = createSlice({
  name: 'newFilter',
  initialState,
  reducers: { 
    setFilter(state,action) {
      if(action.payload.isToday === 'true') action.payload.isNextWeekend = null;
      if(action.payload.isNextWeekend === 'true') action.payload.isToday = null;
      if(state.category !== null && state.category.modality !== action.payload.modality) action.payload.category = null;
      return {
        ...state,
        ...action.payload
      }
    },
    clearFilter(state,action) {

      return {
        ...initialState,
        name: state.name,
        category: state.category,
      }
    }
  },
  extraReducers: {}
  }
)

export const {
  setFilter,
  clearFilter
} = newFilterSlice.actions


export default newFilterSlice.reducer