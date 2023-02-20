import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import { API } from "../../App";

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (formData, { rejectWithValue }) => {
    try {
      formData.items = [
        {
          id: "item-ID-1236",
          title: "Mi producto",
          currency_id: "ARS",
          picture_url:
            "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
          description: "Descripción del Item",
          category_id: "art",
          quantity: 1,
          unit_price: 75.76,
        },
        {
          id: "item-ID-1235",
          title: "Mi producto 2",
          currency_id: "ARS",
          picture_url:
            "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
          description: "Descripción del Item 2",
          category_id: "art",
          quantity: 4,
          unit_price: 500,
        },
      ];


      const response = await API.post("/event", formData);

      
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    event: {},
    loading: false,
    error: null,
    preference_id: null,
  },
  reducers: {},
  extraReducers: {
    [createEvent.pending]: (state) => {
      state.loading = true;
      state.preference_id = null;
    },
    [createEvent.fulfilled]: (state, action) => {
      state.event = action.payload.event;
      state.preference_id = action.payload.preference_id;
      state.loading = false;
      state.error = null;
      // const eventId = action.payload.id;
      // const redirectUrl = `event/${eventId}`;
      // window.location.href = redirectUrl;
    },
    [createEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const selectEvent = (state) => state.event;

export default eventSlice.reducer;
