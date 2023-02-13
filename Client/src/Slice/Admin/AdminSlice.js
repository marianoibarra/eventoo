import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const api = "https://api.eventoo.com.ar";


export const getAllEvents = createAsyncThunk(
  "admin/events",
  async ( thunkAPI) => {
    const response = await axios.get(`${api}/admin/events`);
    return response.data;
  }
);

export const getAllCategories = createAsyncThunk(
  'admin/DesactivedAndActivedCategories',
  async (CategoryId,formData, thunkAPI) => {
    const response = await axios.get(`${api}/admin/categories/${CategoryId}`, formData)    
    return response.data
  })

  export const getUsers = createAsyncThunk(
    'admin/getUsers',
  async (thunkAPI) => {
    const response = await axios.get(`${api}/admin/users`)    
    return response.data
  })

  export const changeUserRole = createAsyncThunk(
    "admin/changeUserRole",
    async (userId, thunkAPI) => {
      const response = await api.put(`${api}/admin/users/change/${userId}`);
      return response.data;
    }
  );

export const changeStateEvent = createAsyncThunk(
  "admin/changeStateEvent",
  async (eventId, thunkAPI) => {
    const response = await axios.put(`${api}/admin/events/${eventId}`);
    return response.data;
  }
);


export const disableUser = createAsyncThunk(
  "admin/disableUser",
  async (userId, thunkAPI) => {
    const response = await axios.put(`${api}/admin/users/ban/${userId}`);
    return response.data;
  }
);

// export const deleteComment = createAsyncThunk(
//   "admin/deleteComment",
//   async (commentId, thunkAPI) => {
//     const response = await api.delete(`${api}/admin/comments/${commentId}`);
//     return response.data;
//   }
// );


export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    events: [],
    users: [],
    users: [],
    categories: [],
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    // ...
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getAllCategories.pending]: (state) => {
      state.loading = true;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getAllEvents.pending]: (state) => {
      state.loading = true;
    },
    [getAllEvents.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    [getAllEvents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [disableUser.pending]: (state) => {
      state.loading = true;
    },
    [disableUser.fulfilled]: (state, action) => {
      state.loading = false;
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload
      );
      state.users[userIndex].disabled = true;
    },
    [disableUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    // [deleteComment.pending]: (state) => {
      [changeUserRole.pending]: (state) => {
        state.loading = true;
    },
    [changeUserRole.fulfilled]: (state, action) => {
      state.loading = false;
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload
        );
      state.users[userIndex].role =
        state.users[userIndex].role === "admin" ? "user" : "admin";
    },
    [changeUserRole.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [changeStateEvent.pending]: (state) => {
      state.loading = true;
    },
    [changeStateEvent.fulfilled]: (state, action) => {
      state.loading = false;
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    [changeStateEvent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },


    [disableUser.pending]: (state) => {
      state.loading = true;
    },
    [disableUser.fulfilled]: (state, action) => {
      state.loading = false;
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload
      );
      state.users[userIndex].active = false;
    },
    [disableUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    //   state.loading = true;
    // },
    // [deleteComment.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.comments = state.comments.filter(
    //     (comment) => comment.id !== action.payload
    //   );
    // },
    // [deleteComment.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // },
  },
});

export default adminSlice.reducer;
