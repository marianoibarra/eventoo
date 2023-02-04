import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosModeEventDetail = createAsyncThunk(
    'eventDetail/axiosModeEventDetail',
    async () => {
        const res = await axios.get('http://api.eventoo.online/home/events/');
        return res.data[0];
    }
);

export const eventDetailSlice = createSlice({
    name: 'eventDetail',
    initialState: {
        eventDetail: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: {
        [axiosModeEventDetail.pending]: (state) => {
            state.loading = true;
        },
        [axiosModeEventDetail.fulfilled]: (state, action) => {
            state.eventDetail = action.payload;   
            state.loading = false;
            state.error = null;
        },
        [axiosModeEventDetail.rejected]: (state, action)=>{
            state.loading = false;
            state.error = action.error;
        }
    }
});

export default eventDetailSlice.reducer;