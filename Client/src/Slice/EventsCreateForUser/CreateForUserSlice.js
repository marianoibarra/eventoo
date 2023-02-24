import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";


export const axiosModeEventsCreateForUser = createAsyncThunk(
  'CreateForUser/axiosModeEventsCreateForUser',
  async () => {
    const res = await API.get('/event')
    return res.data
  }
)

export const eventsCreateForUserSlice = createSlice({
  name: 'CreateForUser',
  initialState: {
    events: [],
    loading: false,
    error: null
  },
  reducers: {
    setFiltercreateEvent: (state, action) => {
      const keyword = action.payload;
      const results = state.eventsList.filter((event) =>
        JSON.stringify(event).includes(keyword)
      );
      state.events = results.length ? results : state.events;
      state.errorEvents = !results.length ? 'No data has been found' : undefined
    },
    sortByAscendingEventscreate: (state, action) => {
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
    sortByDescendingEventscreate: (state, action) => {
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
    [axiosModeEventsCreateForUser.pending]: (state) => {
      state.loading = true
    },
    [axiosModeEventsCreateForUser.fulfilled]: (state, action) => {
      state.events = action.payload;
      state.loading = false;
      state.error = null;

    },
    [axiosModeEventsCreateForUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
}
)

export const {
  setFiltercreateEvent,
  sortByAscendingEventscreate,
  sortByDescendingEventscreate
  } = eventsCreateForUserSlice
  .actions;

export default eventsCreateForUserSlice.reducer