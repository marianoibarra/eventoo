import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";


export const axiosModeEventsBuys = createAsyncThunk(
  'eventsBuysSlice/axiosModeEventsBuys',
  async () => {
    const res = await API.get('/transaction/buyer')
    return res.data
  }
)

export const deleteEvent = createAsyncThunk(
  "eventsBuysSlice/deleteEvent",
  async (eventId, {rejectWithValue}) => {
   try {
    const response = await API.put(``);

    return {...response.data, id:eventId};
   } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
  }
);

export const eventsBuysSlice = createSlice({
  name: 'eventsBuysSlice',
  initialState: {
    events: [],
    eventsList: [],
    loading: false,
    error: null
  },
  reducers: {
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
      }else {
        state.events.sort((a, b) => a[propiedad] - b[propiedad]);
      }
    },
    sortByDescendingEventsBuys: (state, action) => {
      const propiedad = action.payload;
      if (
        propiedad === "start_date" ||
        propiedad === "name"  ||
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
      
      }else {
        state.events.sort((a, b) => b[propiedad] - a[propiedad]);
      }
    },
  },
  extraReducers: {
    [axiosModeEventsBuys.pending]: (state) => {
      state.loading = true
    },
    [axiosModeEventsBuys.fulfilled]: (state, action) => {
      state.events = action.payload.map(t => {return {...t.event, status: t.status}}).filter(e => e !== null);
      state.eventsList = action.payload.map(t => {return {...t.event, status: t.status}}).filter(e => e !== null);
      state.loading = false;
      state.error = null;

    },
    [axiosModeEventsBuys.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteEvent.pending]: (state) => {
      state.loading = true
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.events = action.payload.map(t => {return {...t.event, status: t.status}}).filter(e => e !== null);
      state.loading = false;
      state.error = null;

    },
    [deleteEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
}
)

export const {
setFilterBuyEvent,
sortByAscendingEventsBuys,
sortByDescendingEventsBuys
} = eventsBuysSlice
.actions;
export default eventsBuysSlice.reducer