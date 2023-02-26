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
      data.buys.forEach(t => t.type = 'BUY')
      data.sells.forEach(t => t.type = 'SELL')
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

export const loadPaymentProof = createAsyncThunk(
  "eventsManagement/loadPaymentProof",
  async ({id, data}, { rejectWithValue }) => {
    try {
      const res = await API.put(`/transaction/complete/${id}`, data);
      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);


const initialState = {
  data: {
    buys: [],
    sells: [],
    eventsCreated: [],
  },
  loading: {
    get: false,
    post: false,
    put: false
  },
  error: null,
  transactionWasCreated: false,
  transactionWasCanceled: false,
  paymentWasLoaded: false,
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
      state.transactionWasCancel = false
    },
    [cancelTransaction.fulfilled]: (state) => {
      state.loading.put = false;
      state.error = null;
      state.transactionWasCancel = true
    },
    [cancelTransaction.rejected]: (state, action) => {
      state.loading.put = false;
      state.error = action.payload;
      state.transactionWasCancel = false
    },

    [loadPaymentProof.pending]: (state) => {
      state.loading.put = true
      state.paymentWasLoaded = false
    },
    [loadPaymentProof.fulfilled]: (state) => {
      state.loading.put = false;
      state.error = null;
      state.paymentWasLoaded = true
    },
    [loadPaymentProof.rejected]: (state, action) => {
      state.loading.put = false;
      state.error = action.payload;
      state.paymentWasLoaded = false
    },
  }
})

export const { clearEventsManagement } = eventsManagementSlice.actions;

export default eventsManagementSlice.reducer