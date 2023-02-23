import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";

export const getEventsManagement = createAsyncThunk(
  'eventsManagement/getEventsManagement',
  async (a, { rejectWithValue }) => {
    try {
      const data = {}
      data.buys = await API.get('/transaction/buyer').then(res => res.data)
      data.sells = await API.get('/transaction/seller').then(res => res.data)
      data.eventsCreated = await API.get('/event').then(res => res.data)
      return data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
)

export const postNewTransaction = createAsyncThunk(
  "eventsManagement/postNewTransaction",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/transaction", data);
      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const cancelTransaction = createAsyncThunk(
  "eventsManagement/cancelTransaction",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.put(`/transaction/cancel/${id}`);
      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

const initialState = {
  loading: {
    get: false,
    post: false,
    put: false
  },
  error: null,
  transactionWasCreated: false,
  data: {
    buys: [],
    sells: [],
    eventsCreated: [],
  }
}

export const eventsManagementSlice = createSlice({
  name: 'eventsManagement',
  initialState,
  reducers: {
    clearEventsManagement: () => initialState
  },
  extraReducers: {
    [getEventsManagement.pending]: (state) => {
      state.loading.get = true
    },
    [getEventsManagement.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading.get = false;
      state.error = null;
    },
    [getEventsManagement.rejected]: (state, action) => {
      state.loading.get = false;
      state.error = action.payload;
    },
    [postNewTransaction.pending]: (state) => {
      state.loading.post = true
      state.transactionWasCreated = false
    },
    [postNewTransaction.fulfilled]: (state, action) => {
      state.data.buys = [...state.data.buys, action.payload];
      state.loading.post = false;
      state.error = null;
      state.transactionWasCreated = action.payload
    },
    [postNewTransaction.rejected]: (state, action) => {
      state.loading.post = false;
      state.error = action.payload;
    },
    [cancelTransaction.pending]: (state) => {
      state.loading.put = true
    },
    [cancelTransaction.fulfilled]: (state, action) => {
      state.loading.put = false;
      state.error = null;
      state.transactionWasCreated = false
    },
    [cancelTransaction.rejected]: (state, action) => {
      state.loading.put = false;
      state.error = action.payload;
    },
  }
})

export const { clearEventsManagement } = eventsManagementSlice.actions;

export default eventsManagementSlice.reducer