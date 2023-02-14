import { createSlice } from "@reduxjs/toolkit";

export const newFilterSlice = createSlice({
  name: 'newFilter',
  initialState: {
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
  },
  reducers: { 
    setFilter(state,action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  extraReducers: {}
  }
)

export const {
  setFilter
} = newFilterSlice.actions


export default newFilterSlice.reducer