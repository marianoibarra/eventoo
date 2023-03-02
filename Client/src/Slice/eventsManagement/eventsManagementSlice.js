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



export const deleteEvent = createAsyncThunk(
  "eventsBuysSlice/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await API.put(`/event/${eventId}`);
      return eventId
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const postNewTransaction = createAsyncThunk(
  "eventsManagement/postNewTransaction",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/transaction", data);
      res.data.type = 'BUY'
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
  async ({ id, data }, { rejectWithValue }) => {
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


export const putApprovePayment = createAsyncThunk(
  "eventsManagement/putApprovePayment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/transaction/approvePayment/${id}`, data)
      return res.data
    } catch (error) {
      if (error.res) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)


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
    clearEventsManagement: () => initialState,
    setFilterBuyEvent: (state, action) => {
      const keyword = action.payload;
      const results = state.eventsList.filter((event) =>
        JSON.stringify(event).includes(keyword)
      );
      state.events = results.length ? results : state.events;
      state.errorEvents = !results.length ? 'No data has been found' : undefined
    },
    sortByAscendingEventsBuys: (state, action) => {
      const propiedad = action.payload;
      if (
        propiedad === "start_date" ||
        propiedad === "name" ||
        propiedad === "status"
      ) {
        state.events.sort((a, b) => {
          if (
            !a[propiedad] ||
            !b[propiedad] ||
            typeof a[propiedad] !== "string" ||
            typeof b[propiedad] !== "string"
          ) {
            return 0;
          }
          return a[propiedad].localeCompare(b[propiedad]);
        });
      } else if (propiedad === "organizer") {
        state.events.sort((a, b) => {
          let c = a[propiedad] && a[propiedad].name;
          let d = b[propiedad] && b[propiedad].name;
          if (
            !c ||
            !d ||
            typeof c !== "string" ||
            typeof d !== "string"
          ) {
            return 0;
          }
          return c.localeCompare(d);
        });
      } else {
        state.events.sort((a, b) => a[propiedad] - b[propiedad]);
      }
    },
    sortByDescendingEventsBuys: (state, action) => {
      const propiedad = action.payload;
      if (
        propiedad === "start_date" ||
        propiedad === "name" ||
        propiedad === "status"
      ) {
        state.filteredDataUser = state.events.sort((a, b) => {
          if (
            !a[propiedad] ||
            !b[propiedad] ||
            typeof a[propiedad] !== "string" ||
            typeof b[propiedad] !== "string"
          ) {
            return 0;
          }
          return b[propiedad].localeCompare(a[propiedad]);
        });
      } else if (propiedad === "organizer") {
        state.events.sort((a, b) => {
          let c = a[propiedad] && a[propiedad].name;
          let d = b[propiedad] && b[propiedad].name;
          if (
            !c ||
            !d ||
            typeof c !== "string" ||
            typeof d !== "string"
          ) {
            return 0;
          }
          return d.localeCompare(c);
        });

      } else {
        state.events.sort((a, b) => b[propiedad] - a[propiedad]);
      }
    },
  },
  extraReducers: {
    [getEventsManagement.pending]: (state) => {
      state.loading.get = true
    },
    [getEventsManagement.fulfilled]: (state, action) => {
      console.log(action.payload.eventsCreated)
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
    [deleteEvent.pending]: (state) => {
      state.loading = true
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.loading = false;
      const eventId = action.payload;

      // Buscar el índice del evento en el arreglo state.eventsCreated usando findIndex
      const eventIndex = state.data.eventsCreated.findIndex((e) => e.id === eventId);

      // Si el evento existe en el arreglo, eliminarlo usando splice
      if (eventIndex !== -1) {
        state.data.eventsCreated.splice(eventIndex, 1);
      }
    },
    [deleteEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [putApprovePayment.pending]: (state) => {
      state.loading.put = false
    },
    [putApprovePayment.fulfilled]: (state) => {
      state.loading.put = true
      state.error = false
    },
    [putApprovePayment.rejected]: (state, action) => {
      state.loading.put = false
      state.error = action.payload
    }
  }
})

export const { clearEventsManagement } = eventsManagementSlice.actions;

export default eventsManagementSlice.reducer